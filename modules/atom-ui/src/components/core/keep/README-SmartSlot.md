### SmartSlot – Résumé pratique

SmartSlot est un outil pour construire des Molécules avec des sous‑parties entièrement personnalisables, en gérant proprement trois axes pour chaque “slot”:
- content: le contenu (texte, JSX…)
- props: les props à injecter (className, size, typo…)
- Component: le composant à instancier (type ou élément)

Il fusionne ces couches dans cet ordre (priorité croissante):
- smartSlotProps < baseSpecs < variantSpecs < specs (dernier gagne)
- props sont fusionnées en shallow‑merge; Component/content sont remplacés par le dernier défini

Règle de rendu: SmartSlot rend seulement si au moins un des signaux est présent: content non vide, Component défini, ou children du wrapper.

---

### Header est une Molécule complète
- `Header` fonctionne seul, et utilise des SmartSlots internes pour ses parties: `title`, `subtitle`, `description`, `icon`.
- Chaque partie est modélisée via la triplette: `{ content, props, Component }`.
- Les variantes de `Header` (main, section, sub-section) injectent des presets via `variantSpecs` dans ses SmartSlots internes.

Conclusion: on n’a pas besoin d’“envelopper” `Header` dans un SmartSlot externe pour l’utiliser; il gère déjà ses propres SmartSlots.

---

### Card est une composition (compound component)
Card est un helper pré‑composé de sous‑éléments (qui peuvent être utilisés seuls):

```tsx
<Card.Box>
  <Card.Header ... />
  <Card.Content>...</Card.Content>
  <Card.Footer>...</Card.Footer>
</Card.Box>
```

Il peut aussi être consommé en version “composée” (API simple) si vous exposez une façade:
```tsx
<Card title="..." Icon={...}>Body</Card>
```

Chaque sous‑partie de Card peut être:
- un Atom (ex: `Card.Content` basé sur `Atom`),
- une Molécule (ex: `Card.Header` qui etend `Header`),
- un simple `div` (ex: `Card.Footer`).

Et chacune de ces parties peut ou non être un SmartSlot (selon que vous voulez la rendre “remplaçable / configurable” via la triplette).

---

### CardHeader = extension d’une Molécule ET NON PAS UNE SmartMolecule !!!

`CardHeader` est une “recette” au‑dessus de `Header`. On veut:
- injecter des presets (ex: typo, align, iconProps) selon un `variant` propre à Card,
- tout en laissant l’utilisateur surcharger.

Dans ce cas, ce n’est pas forcément une bonne idée d’envelopper `Header` dans un SmartSlot externe (double fusion + garde d’affichage). Deux approches sont possibles:

#### A) Composition simple (recommandée)
- Calculer des presets via une map `variant → Partial<HeaderProps>`
- Fusionner champ par champ puis rendre `<Header {...merged} />`

```ts
const cardHeaderPresets = {
  "main-card": {
    titleProps: { typo: "main-title" },
    subtitleProps: { typo: "main-subtitle" },
    iconProps: { variant: "big", className: "mt-6" },
    align: "center",
  },
  card: {
    titleProps: { typo: "card-title" },
    subtitleProps: { typo: "card-subtitle" },
    align: "left",
  },
} as const

function CardHeader({ variant = "card", ...user }: Omit<HeaderProps, "variant"> & { variant?: keyof typeof cardHeaderPresets }) {
  const v = cardHeaderPresets[variant] ?? {}
  const merged: HeaderProps = {
    ...user,
    titleProps: { ...v.titleProps, ...user.titleProps },
    subtitleProps: { ...v.subtitleProps, ...user.subtitleProps },
    descriptionProps: { ...(v as any).descriptionProps, ...user.descriptionProps },
    iconProps: { ...v.iconProps, ...user.iconProps },
    align: user.align ?? v.align,
    className: [v.className, user.className].filter(Boolean).join(" "),
  } as any
  return <Header {...merged} />
}
```

Avantage: simple, pas de garde SmartSlot, pas de double couche.

#### B) Modéliser le header de Card comme un SmartSlot (ou plutot un SmartMolecule) - Ne fonctionne pas !

Un SmartSlot permet à une Molécule (et à son consommateur) de modifier directement les props d’un slot donné. Si je transforme une Molécule comme Header en SmartSlot (ex: SmartHeader), je peux alors modifier les props du composant Header, mais pas celles de ses SmartSlots internes. Par exemple, si Header possède props: { iconProps: { foo } } et que je fournis { iconProps: { bar } } via le SmartSlot de Header, le merge effectué à ce niveau remplace l’objet iconProps au lieu de le fusionner en profondeur, car on opère au niveau du SmartSlot Header et non à l’intérieur pour chaque SmartSlots internes.

Pour autoriser une surcharge fine de tous les SmartSlots d’une Molécule (un niveau “en dessous”), il faudrait un concept de “SmartMolecule”. Mais cela introduirait une récursivité potentiellement infinie (SmartMolecule de SmartMolecule, etc.) et exigerait des merges profonds complexes. Ce serait vite trop lourd et fragile.

---

### Bonnes pratiques
- Utiliser SmartSlot pour les “parties” internes d’une Molécule (title, icon, wrapper…), pas pour emballer toute une Molécule déjà composée.
- Si vous modélisez un slot SmartSlot, pensez à fournir un signal de rendu (children, Component ou content), sinon rien ne s’affiche.
- Pour les “recettes” d’extension d’une Molécule existante (CardHeader → Header), préférez la composition avec fusion ciblée si vous n’avez pas besoin de rendre la partie remplaçable.
- Garder la priorité claire: base < variant < user.

---

### TL;DR
- `Header` = Molécule autonome avec SmartSlots internes.
- `Card` = composition (compound). Ses sous‑parties peuvent être Atom/Molécule/div, avec ou sans SmartSlot.
- `CardHeader` = extension d’une Molécule → composition simple (fusion) recommandée; utilisez SmartSlot seulement si vous voulez rendre la partie remplaçable, en n’oubliant pas le signal de rendu.
