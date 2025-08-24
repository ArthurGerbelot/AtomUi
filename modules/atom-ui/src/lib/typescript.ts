

export type ResponsiveType<T> = T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T };
export type PartialResponsiveType<T> = Partial<ResponsiveType<T>>;