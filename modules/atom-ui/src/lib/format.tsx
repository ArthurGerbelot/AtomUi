type ParsedAmount = {
  /** Chaîne normalisée pour l’input: séparateur '.' et aucun group */
  value: string
  /** Même chose mais sans zéros inutiles en fin de décimal (ni '.' final) */
  valueTrimmed: string
  /** Number si convertible, sinon null (ex: "-", ".", "-.") */
  number: number | null
}

function getLocaleDelimiters(locale = navigator.language) {
  const parts = new Intl.NumberFormat(locale).formatToParts(1234567.89)
  const group = parts.find(p => p.type === "group")?.value ?? ","
  const decimal = parts.find(p => p.type === "decimal")?.value ?? "."
  const minus = new Intl.NumberFormat(locale, { signDisplay: "always" })
    .formatToParts(-1).find(p => p.type === "minusSign")?.value ?? "-"
  return { group, decimal, minus }
}

function groupFractional(fraction: string, sep: string): string {
  if (!fraction) return ""
  if (fraction.length <= 2) return fraction
  const first = fraction.slice(0, 2)
  const rest = fraction.slice(2)
  const chunks: string[] = []
  for (let i = 0; i < rest.length; i += 3) chunks.push(rest.slice(i, i + 3))
  return [first, ...chunks].join(sep)
}

function normalizeLooseNumericForFormat(raw: string): string {
  // Remove all spaces (incl. NBSP/thin)
  let s = raw.trim().replace(/[\u00A0\u202F\u2009\s]/g, "")

  // Keep a single leading minus if present
  let sign = ""
  if (s.startsWith("-")) { sign = "-"; s = s.slice(1) }
  else if (s.startsWith("+")) { s = s.slice(1) }

  const hasDot = s.includes(".")
  if (hasDot) {
    // Already a dot: drop all commas (commas treated as thousand separators)
    s = s.replace(/,/g, "")
  } else if (s.includes(",")) {
    // No dot but commas present: first comma => decimal point, the rest removed
    const first = s.indexOf(",")
    s = s.slice(0, first) + "." + s.slice(first + 1).replace(/,/g, "")
  }

  // Keep digits + first dot only
  let out = ""
  let dotUsed = false
  for (const ch of s) {
    if (ch >= "0" && ch <= "9") out += ch
    else if (ch === "." && !dotUsed) { out += "."; dotUsed = true }
  }
  return sign + out
}

export function formatAmount(
  input: string | number,
  fractionDigits: number,
  locale = navigator.language
): string {
  if (fractionDigits < 0 || !Number.isFinite(fractionDigits)) fractionDigits = 0

  // NEW: be forgiving with commas when input is a string
  const normalized =
    typeof input === "string"
      ? normalizeLooseNumericForFormat(input)
      : String(input)

  const n = Number(normalized)
  if (!Number.isFinite(n)) return ""

  const { group, decimal } = (function getLocaleDelimiters(locale = navigator.language) {
    const parts = new Intl.NumberFormat(locale).formatToParts(1234567.89)
    const group = parts.find(p => p.type === "group")?.value ?? ","
    const decimal = parts.find(p => p.type === "decimal")?.value ?? "."
    return { group, decimal }
  })(locale)

  const fmt = new Intl.NumberFormat(locale, {
    style: "decimal",
    useGrouping: true,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(n)

  if (fractionDigits === 0) return fmt

  const idx = fmt.lastIndexOf(decimal)
  if (idx === -1) return fmt
  const intPart = fmt.slice(0, idx)
  const fracPart = fmt.slice(idx + decimal.length)

  function groupFractional(fraction: string, sep: string): string {
    if (!fraction) return ""
    if (fraction.length <= 2) return fraction
    const first = fraction.slice(0, 2)
    const rest = fraction.slice(2)
    const chunks: string[] = []
    for (let i = 0; i < rest.length; i += 3) chunks.push(rest.slice(i, i + 3))
    return [first, ...chunks].join(sep)
  }

  const groupedFrac = groupFractional(fracPart, group === "," ? " " : group)
  return `${intPart}${decimal}${groupedFrac}`
}


export function parseAmount(
  formatted: string,
  locale = navigator.language
): ParsedAmount {
  if (!formatted) return { value: "", valueTrimmed: "", number: null }

  const { group, decimal, minus } = getLocaleDelimiters(locale)

  // 1) Enlever tout type d’espace (NBSP, thin space, etc.)
  let s = formatted.replace(/[\u00A0\u202F\u2009\s]/g, "")

  // 2) Gérer le signe
  const isNeg = s.startsWith(minus) || s.startsWith("-")
  if (isNeg) s = s.slice((s[0] || "").length)

  // 3) Retirer le séparateur de group local
  const groupEsc = group.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  s = s.replace(new RegExp(groupEsc, "g"), "")

  // 4) Remplacer le séparateur décimal local par '.'
  if (decimal !== ".") {
    const decEsc = decimal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    s = s.replace(new RegExp(decEsc, "g"), ".")
  }

  // 5) Conserver uniquement chiffres + premier point
  let cleaned = ""
  let dotUsed = false
  for (const ch of s) {
    if (ch >= "0" && ch <= "9") cleaned += ch
    else if (ch === "." && !dotUsed) { cleaned += "."; dotUsed = true }
  }
  const value = (isNeg ? "-" : "") + cleaned

  // 6) Version "trimmed": enlever les zéros de fin et le '.' orphelin
  let valueTrimmed = value
  if (valueTrimmed.includes(".")) {
    valueTrimmed = valueTrimmed.replace(/(\.\d*?)0+$/, "$1") // trim trailing zeros
    valueTrimmed = valueTrimmed.replace(/\.$/, "")           // drop trailing dot
    // Conserver le '-' si présent (il y est déjà)
  }

  // 7) Number (null si pas un nombre valable)
  const num =
    value === "-" || value === "." || value === "-."
      ? null
      : Number(value)
  const number = Number.isFinite(num!) ? (num as number) : null

  return { value, valueTrimmed, number }
}
