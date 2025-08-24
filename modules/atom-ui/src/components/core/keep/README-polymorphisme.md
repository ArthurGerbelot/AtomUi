# 2 Solutions pour le meme resultat.

Tout fonctionne parfaitement partout

SAUF dans la definition d'un component Polymorphe utilisant un autre Component
    => le TS n'est pas bien interpreter
    => <Atom invlidProps /> ne trigger aucun issue par TS.

### IGNORER CA !
C'est un comportement classique de TypeScript : la validation est plus stricte dans les contexts de consommation JSX que dans les contexts de définition de composants avec des types génériques.

- C'est un comportement normal de TypeScript avec les composants polymorphes
- La validation fonctionne là où c'est important : quand les développeurs utilisent vos composants
- Les erreurs dans le code de définition sont rares car vous testez vos composants
- Ça n'affecte pas les utilisateurs finaux



## Pour ateindre ce but, 2 solutions

Spoiler: **v1 est la meilleur** !



### APPROCHE v0 : Legacy "ComponentWithAs"

🏗️ Architecture
- Pattern : ComponentWithAs<Props, DefaultTag>
- Implémentation : forwardRef<any, any> puis cast vers signature polymorphe
- Types : Union directe AtomProps & VariantProps<typeof textVariants>

✅ Points Positifs
- Simplicité conceptuelle : Un seul type polymorphe par composant
- Performance : Moins de couches d'abstraction TypeScript
- Legacy-friendly : Pattern plus ancien, bien documenté
- Lisibilité : Types plus directs à comprendre

❌ Points Négatifs
- Type safety limitée : forwardRef<any, any> masque les erreurs
- Composition difficile : Dur d'étendre/composer plusieurs composants
- IntelliSense faible : Autocomplétion moins précise
- Maintenance : Plus difficile de tracer les props à travers les couches

### APPROCHE v1 : Modern "OwnProps + PolymorphicHelpers"

🏗️ Architecture

- Pattern : PolymorphicProps<T, OwnProps> avec helpers dédiés
- Implémentation : forwardRefPolymorphic générique
- Types : Séparation claire AtomProps vs AtomPolymorphicProps<T>

✅ Points Positifs

- Type safety forte : Meilleure validation TypeScript
- Composabilité : Facile d'étendre (AtomOwnProps & TextOwnProps)
- IntelliSense excellente : Autocomplétion précise des props
- Maintenabilité : Architecture claire et modulaire
- Standards modernes : Suit les patterns actuels (Radix, Ariakit, etc.)

❌ Points Négatifs

- Complexité : Plus de types et helpers à comprendre
- Verbosité : Plus de code boilerplate
- Courbe d'apprentissage : Plus difficile pour débutants
- Performance théorique : Plus de layers TypeScript (négligeable en pratique)

## VERDICT : L'APPROCHE 2 EST MEILLEURE

Pourquoi choisir l'approche "OwnProps" ?

- Écosystème moderne : C'est devenu le standard (Radix UI, Ariakit, Mantine v7+)
- Extensibilité : Permet de composer facilement (Text → Badge → BadgeWithCount)
- Type safety : Détecte plus d'erreurs au compile-time
- DX (Developer Experience) : Meilleure autocomplétion et documentation
- Future-proof : Plus aligned avec l'évolution de TypeScript



### Quand utiliser le polymorphisme vs la composition

Dans ce kit, tous les composants n’ont pas besoin d’être polymorphes. Le polymorphisme (avec `forwardRefPolymorphic`, `as` / `asChild`, et des OwnProps dédiées) est utile seulement quand le composant introduit une véritable surface d’API supplémentaire. Sinon, la composition suffit.

- Utiliser le polymorphisme si vous:
  - **Ajoutez des nouvelles props publiques** (OwnProps) propres au composant, qui changent son comportement/rendu.
  - **Contrôlez l’élément rendu** via `as` ou supportez `asChild` à ce niveau (et pas uniquement en relayant vers l’enfant).
  - **Consommez/transformez des Atomic Tokens** à ce niveau (et pas seulement les relayer vers l’enfant).
  - **Exposez un ref public** qui doit cibler le nœud final rendu par ce composant.

- Préférer la composition si vous:
  - **N’ajoutez pas de nouvelles props** et ne faites que **relayer** l’API d’un composant enfant déjà polymorphe.
  - **Injectez des presets** (ex. SmartSlotVariantSpecs) pour configurer l’enfant, sans changer sa nature polymorphe.
  - **Laissez l’appelant contrôler `as`/`asChild`** via l’enfant (vous ne faites que passer les props plus bas).

Exemple concret:
- `Text` étend `Atom` → polymorphisme pertinent (nouvelles variantes, choix automatique de balise, tokens typés, etc.).
- `CardHeader` compose `Header` → pas besoin de polymorphisme. Il convertit un `variant` propre à la carte en un **preset de props** (SmartSlot) et rend `<Header {...merged} />`. `Header` garde son propre `variant` et son polymorphisme interne.

Checklist de décision rapide:
- **Ai-je des nouvelles props publiques?** Oui → Polymorphisme. Non → Composition.
- **Dois-je rendre un autre élément (`as`) ou supporter `asChild` ici?** Oui → Polymorphisme. Non → Composition.
- **Est-ce que je transforme des tokens à ce niveau?** Oui → Polymorphisme. Non → Composition.
- **Un simple merge de presets et rendu de l’enfant suffit-il?** Oui → Composition.

Notes:
- Préférer la composition pour les molécules (plusieurs sous‑composants) afin d’éviter les contraintes de `asChild`.
- Utiliser le polymorphisme quand le composant ajoute une vraie surface d’API (OwnProps), contrôle la balise, ou consomme des tokens au niveau du composant.

### Tableau d’étude des composants (polymorphisme)

| Composant | Polymorphe | Pourquoi | OwnProps | Tag control (as/asChild) | Tokens |
|---|---|---|---|---|---|
| `Text` | Oui | Sémantique typo, choisit la balise selon `variant` | `variant` | Oui/Oui | Oui |
| `Heading` | Oui | Déduit la balise via `typo` (h1/h2/…) | (aucune) | Oui/Oui | Oui |
| `Code` | Oui | Affichage code inline, option `includeTag` | `includeTag` | Oui/Oui | Oui |
| `Stack` | Oui | Primitive de layout (direction, wrap) | `direction`, `wrap` | Oui/Oui | Oui |
| `Header` | Non | Molécule multi‑parties; évite `asChild` | (SmartSlots) | Non/Non | Oui (via wrapper Atom) |
| `CardHeader` | Non | Recette: injecte des presets dans `Header` | `variant` (card) | Non/Non | Hérite de `Header` |
| `Card (Root)` | Oui | Conteneur/surface de carte | `variant` (surface) | Oui / (éviter `asChild`) | Oui |
