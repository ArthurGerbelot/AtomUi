🧠 Architecture Générale

Le système repose sur une séparation stricte entre :
Les styles : pilotés uniquement via des classes Tailwind (pas de CSS-in-JS ou style objects),
Les tokens : des props sémantiques (size, surface, spacing, etc.) agnostiques au CSS, résolues en classes via des variants globaux,
Les composants : des wrappers simples et agnostiques qui composent les tokens, des classes, et de la logique React.

🧩 1. Les Tokens (AtomPolymorphicProps)
Des props comme size, surface, boxing, spacing, etc. sont définies globalement comme des tokens :


export const variants = {
  size:    { sm: "text-sm", md: "text-base", lg: "text-lg" },
  boxing:  { sm: "p-2", md: "p-4", lg: "p-6" },
  spacing: { sm: "gap-2", md: "gap-4", lg: "gap-6" },
  surface: {
    solid:   "bg-primary text-primary-foreground",
    subtle:  "bg-muted text-muted-foreground",
    outline: "border border-border bg-transparent",
  },
} as const;
Ils sont consommés uniquement via la fonction resolveAtomProps() pour éviter toute pollution du DOM.

🧪 2. resolveAtomProps()
Une fonction utilitaire centrale :

Filtre les tokens présents dans props,

Résout les valeurs en classes Tailwind (text-sm, p-4, etc.),

Retourne :

className = tokens + props.className, merge avec twMerge

rest = props "non-atom", à propager à l’élément final (button, div, etc.)

Exemple :

const { className, rest } = resolveAtomProps({
  size: "lg",
  spacing: "md",
  className: "text-red-500",
  onClick: () => {},
});

// className = "text-lg gap-4 text-red-500"
// rest = { onClick }
Cela garantit que les tokens ne s’accumulent pas en cascade (ex: size propagé plusieurs fois).

🧱 3. Atom
Ce n’est plus un composant, mais un système :
Un type de props (AtomPolymorphicProps),

Une fonction de résolution (resolveAtomProps),

Et une convention de composition : les composants doivent consommer les tokens à leur niveau, et ne jamais les propager à l’enfant.

🧬 4. Composition en couches
Chaque composant intermédiaire doit :

Appeler resolveAtomProps() à son niveau,

Propager rest (props non-atom),

Composer les classes dans l’ordre voulu :

classes de base du composant (base)

variant interne (variant)

classes issues des tokens (atomClass)

props.className (vient du composant appelant)

Exemple :
tsx
Copy
Edit
function Button(props) {
  const { className, rest } = resolveAtomProps(props);
  return (
    <BaseButton
      {...rest}
      className={cn("inline-flex items-center", className)}
    />
  );
}
Pas d’asChild, pas de cascade manuelle. Chaque niveau est autonome.

🧭 5. Slot et SmartSlot
Systèmes de rendu partiel ou polymorphe des composants internes :

Slot
Simple proxy asChild, remplace le wrapper <div> par le children passé

Pratique pour faire <Slot>{children}</Slot> tout en gardant le style du parent

SmartSlot (ou renderSlot)
Permet de passer :

title → contenu

titleProps → props

Title → composant JSX alternatif

Gère les conditions :

Si Title fourni → rendu

Sinon rendu par défaut avec fallback

Si tout vide → skip

Utilisé pour les composants composés avec plusieurs sous-parties (Card, Dialog, etc.)

✨ SmartSlot (version enrichie)

Tu peux créer un `SmartSlot` qui passe le `size`, `surface`, etc. automatiquement à l’enfant s’il accepte ces props :

```tsx
export function SmartSlot<P>({
  Component,
  defaultComponent,
  injectedProps,
  children,
  ...rest
}: {
  Component?: React.ComponentType<P>
  defaultComponent: React.ElementType
  injectedProps?: Partial<P>
  children?: React.ReactNode
} & Omit<P, keyof JSX.IntrinsicElements>) {
  const Comp = Component || defaultComponent

  if (!children) return null

  return React.isValidElement(children)
    ? React.cloneElement(children as React.ReactElement, {
        ...injectedProps,
        ...(children.props || {}),
      })
    : <Comp {...injectedProps} {...rest}>{children}</Comp>
}
```

---



🎨 6. Style global via tokens + utilities
Pour tous les styles qui ne dépendent pas de props :

- Déclare les variables en `:root` et mappe-les via `@theme` (text-*, bg-*, …)
- Ajoute les alias atomiques manquants via `@layer utilities` (ex: `.gap-md { @apply gap-4 }`)
- N’utilise plus `@layer components` pour des “recipes” (ex: `surface-*`, `typo-*`). Ces recettes doivent vivre côté TypeScript sous forme de variants qui émettent des utilitaires (bg-*, text-*, border-*). Raison: Tailwind ne permet pas d’override fiable de `@layer components` par empilement de classes; les utilitaires + l’ordre “dernier gagne” si, avec twMerge.

Exemples (à placer en TS, pas en CSS components) :
```ts
export const surfaceVariants = {
  card:   "bg-surface-card text-surface-card-fg shadow-card",
  subtle: "bg-primary/20 text-primary-higher-contrast shadow-xs",
  solid:  "bg-primary text-primary-foreground shadow-xs",
  outline:"border border-border bg-transparent",
} as const

export const typoVariants = {
  body:   "text-body leading-body",
  title:  "text-title leading-body",
  caption:"text-xs italic text-muted-foreground",
} as const
```

🎯 7. Propagation symbolique des tokens
Les composants peuvent dire :

tsx
Copy
Edit
<Box size="md" boxing="md" spacing="md" />
Mais peuvent aussi dériver automatiquement d’un seul token :

tsx
Copy
Edit
<Button size="lg" /> // ← le composant peut faire:
<Box size="lg" spacing="lg" boxing="lg" />
Cela permet une simplification de l’API tout en gardant des AtomPolymorphicProps flexibles.

🧩 8. componentVariant vs token
Les tokens sont globaux et agnostiques du composant : size, spacing, surface, colorTheme, etc.

Les variants sont spécifiques au composant : variant="primary" dans un Button → injecte une combinaison de tokens.

Exemple :

buttonVariants: {
  primary:   { surface: "solid",   colorTheme: "brand" },
  secondary: { surface: "subtle",  colorTheme: "low" },
}
✅ Avantages du système
Composable par couche (Button > BaseButton > HTML)

Aucun asChild requis

Clean DOM (pas de props fantômes)

Les classes viennent toujours du niveau qui les définit

Agnostique : Button, Text, Box, Card, etc. peuvent tous consommer les mêmes AtomPolymorphicProps

Utilisation naturelle de Tailwind

Possibilité de personnaliser le système (variants, apply, cn) sans casser les composants

🛠️ Utilitaires Bonus
cn(...classes) : wrapper twMerge(clsx(...)) pour une gestion propre des overrides

AtomPolymorphicProps : base à réutiliser dans tout le design system

variantFiles (WIP) : source unique déclarative pour toutes les combinaisons style/tokens

🧪 Évolutions futures possibles
Ajouter animation, elevation, shape, etc. comme nouveaux tokens

Générer automatiquement les @apply à partir des variants

Ajouter support d’un ThemeContext pour override de tokens dynamiquement

Ajouter responsive tokens (size={{ base: "sm", md: "lg" }})

## ✅ Pourquoi ton approche est bonne

| Principe                                 | Respecté ? | Commentaire                              |
| ---------------------------------------- | ---------- | ---------------------------------------- |
| 💅 Style Tailwind natif                  | ✅          | `Atom` ne fait que du `cva + className`  |
| ♻️ Réutilisabilité des tokens            | ✅          | via `themeVariants` partagés             |
| 🧩 Composition propre avec Slot          | ✅          | `SmartSlot` est conçu pour ça            |
| 🎯 Propagation contextuelle ciblée       | ✅          | Tu propages `size` au besoin, à la main  |
| 💥 Surcharge contrôlable par `className` | ✅          | Tu merges toujours en dernier            |
| 🧼 Pas de bloat type Chakra props        | ✅          | Tu ne pollues pas la signature de `Atom` |

---