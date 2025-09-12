/**
 * Formate l'indentation d'un JSON stringifié avec des règles spécifiques :
 * - Première ligne : aucun espace supplémentaire
 * - Dernière ligne : space - 2 espaces
 * - Autres lignes : space espaces
 * @param jsonObject - L'objet à stringifier
 * @param space - Nombre d'espaces de base pour l'indentation
 * @returns Le JSON formaté avec l'indentation personnalisée
 */
export const formatJsonIndentation = (jsonObject: object, space: number = 6): string => {
  return JSON.stringify(jsonObject, null, 2)
    .split('\n')
    .map((line, index, array) => {
      if (!line.trim()) return line;
      if (index === 0) return ' ' + line;
      if (index === array.length - 1) return ' '.repeat(Math.max(0, space)) + line;
      return ' '.repeat(space) + line;
    })
    .join('\n');
};