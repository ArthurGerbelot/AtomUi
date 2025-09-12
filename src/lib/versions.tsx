
// ==============================================================
// Types and constants
// ==============================================================

export type StrictApiVersion = { major: number, minor: number, patch: number, release?: string }
export type ApiVersion = StrictApiVersion | 'lastest';

export const versions: ApiVersion[] = [
  { major: 0, minor: 1, patch: 0, release: 'beta' },
  { major: 1, minor: 0, patch: 0 },
  { major: 1, minor: 2, patch: 0 },

  'lastest', // Keep last - allows URL to always target the latest version without specifying exact version
];

// ==============================================================
// Utility functions
// ==============================================================



// --------------------------------------------------------------
// Casting Object (ApiVersion) <=> String
// --------------------------------------------------------------

export const toApiVersion = (version: string) => {
  if (version === 'lastest') return 'lastest';
  // Split version string into major, minor, patch, release
  const [v, release] = version.split('-');
  const [major, minor, patch] = v.split('.').map(Number);
  return { major, minor, patch, release };
}
export const toVersionString = (version: ApiVersion) => {
  if (version === 'lastest') return 'lastest';
  if (typeof version === 'string') return version;
  if (!version || typeof version !== 'object') return 'lastest';
  return `${version.major}.${version.minor}.${version.patch}${version.release ? `-${version.release}` : ''}`;
}


// --------------------------------------------------------------
// Utils
// --------------------------------------------------------------

export const isVersionEqual = (version1: ApiVersion, version2: ApiVersion) => {
  // Convert to strict version
  const v1 = (version1 === 'lastest' ? versions[versions.length - 2] : version1) as StrictApiVersion;
  const v2 = (version2 === 'lastest' ? versions[versions.length - 2] : version2) as StrictApiVersion;
  return v1.major === v2.major && v1.minor === v2.minor && v1.patch === v2.patch && v1.release === v2.release;
}

/**
 * Check if the tested version is before the current version.
 * @param tested - The tested version
 * @param current - The current version
 * @returns True if tested < current, false otherwise.
 * Example: isVersionBefore('1.0.0', '1.1.0') => true
 */
export const isVersionBefore = (tested: ApiVersion, current: ApiVersion) => {
  // Convert to strict version
  if (tested === 'lastest')
    return current === 'lastest' ? false : true;
  else if (current === 'lastest') return false;

  // If none are lasted. Test them as strict versions
  const _tested = tested as StrictApiVersion;
  const _current = current as StrictApiVersion;

  // Compare major version
  if (_tested.major < _current.major) return true;
  if (_tested.major > _current.major) return false;

  // Major is equal, compare minor version
  if (_tested.minor < _current.minor) return true;
  if (_tested.minor > _current.minor) return false;

  // Minor is equal, compare patch version
  if (_tested.patch < _current.patch) return true;
  if (_tested.patch > _current.patch) return false;

  // All numbers equal, compare release versions
  // No release (stable) > release (beta, alpha, etc.)
  if (!_tested.release && _current.release) return false; // stable > beta
  if (_tested.release && !_current.release) return true;  // beta < stable

  if (!_tested.release && !_current.release) return false; // Both stable, equal

  // Both have releases, compare lexicographically
  return _tested?.release && _current?.release ? _tested.release < _current.release : false;
}

/**
 * Find the right version from the list of existing versions
 * @param version - The version to find
 * @param versions - The list of existing versions
 * @returns The right version from the list of existing versions (before or equals to the requested version)
 */
export const getKnownVersions = (version: ApiVersion, versions: ApiVersion[]): ApiVersion[] => {
  return versions.filter(v => isVersionBefore(v, version) || isVersionEqual(v, version));
}

/**
 * Find the latest version that is before or equal to the requested version
 * @param version - The version to find
 * @param versions - The list of existing versions
 * @returns The latest version that is before or equals to the requested version
 */
export const getLatestKnownVersion = (version: ApiVersion, versions: ApiVersion[]): ApiVersion | undefined => {
  const knownVersions = getKnownVersions(version, versions);
  if (knownVersions.length === 0) return undefined;

  // Sort versions and return the latest one
  return knownVersions.reduce((latest, current) => {
    if (isVersionBefore(latest, current)) {
      return current;
    }
    return latest;
  });
}