export const versions = [
  'v.beta',

  'lastest', // Keep last - allows URL to always target the latest version without specifying exact version
] as const;
export type ApiVersion = typeof versions[number];
