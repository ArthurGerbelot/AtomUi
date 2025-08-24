// =============================================================================
// EVENTS
// =============================================================================


// Trigger a real React onChange after modifying el.value
// -----------------------------------------------
export function setReactInputValue(el: HTMLInputElement, next: string, { silent = false } = {}) {
  const proto = Object.getPrototypeOf(el)
  const setter =
    Object.getOwnPropertyDescriptor(proto, "value")?.set ??
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set
  setter?.call(el, next)
  if (!silent) el.dispatchEvent(new Event("input", { bubbles: true }))
}
