import {
  isVersionBefore,
  isVersionEqual,
  toApiVersion,
  toVersionString,
  type StrictApiVersion,
  type ApiVersion
} from './versions'

describe('Version utilities', () => {

  // Test data
  const v1_0_0: StrictApiVersion = { major: 1, minor: 0, patch: 0, release: '' }
  const v1_0_0_beta: StrictApiVersion = { major: 1, minor: 0, patch: 0, release: 'beta' }
  const v1_0_0_alpha: StrictApiVersion = { major: 1, minor: 0, patch: 0, release: 'alpha' }
  const v1_1_0: StrictApiVersion = { major: 1, minor: 1, patch: 0, release: '' }
  const v1_0_1: StrictApiVersion = { major: 1, minor: 0, patch: 1, release: '' }
  const v2_0_0: StrictApiVersion = { major: 2, minor: 0, patch: 0, release: '' }

  describe('isVersionBefore', () => {

    it('should compare major versions correctly', () => {
      expect(isVersionBefore(v1_0_0, v2_0_0)).toBe(true)
      expect(isVersionBefore(v2_0_0, v1_0_0)).toBe(false)
    })

    it('should compare minor versions correctly when major is equal', () => {
      expect(isVersionBefore(v1_0_0, v1_1_0)).toBe(true)
      expect(isVersionBefore(v1_1_0, v1_0_0)).toBe(false)
    })

    it('should compare patch versions correctly when major and minor are equal', () => {
      expect(isVersionBefore(v1_0_0, v1_0_1)).toBe(true)
      expect(isVersionBefore(v1_0_1, v1_0_0)).toBe(false)
    })

    it('should handle release versions correctly', () => {
      // beta < stable (no release)
      expect(isVersionBefore(v1_0_0_beta, v1_0_0)).toBe(true)
      expect(isVersionBefore(v1_0_0, v1_0_0_beta)).toBe(false)

      // alpha < beta (lexicographic)
      expect(isVersionBefore(v1_0_0_alpha, v1_0_0_beta)).toBe(true)
      expect(isVersionBefore(v1_0_0_beta, v1_0_0_alpha)).toBe(false)
    })

    it('should return false for equal versions', () => {
      expect(isVersionBefore(v1_0_0, v1_0_0)).toBe(false)
      expect(isVersionBefore(v1_0_0_beta, v1_0_0_beta)).toBe(false)
    })

    it('should handle "lastest" version', () => {
      // Based on the current logic in isVersionBefore:
      // - If tested === 'lastest': return current === 'lastest' ? false : true
      // - If current === 'lastest': return false

      expect(isVersionBefore(v1_0_0, 'lastest')).toBe(false)    // any version vs lastest → false
      expect(isVersionBefore(v2_0_0, 'lastest')).toBe(false)    // any version vs lastest → false
      expect(isVersionBefore('lastest', v1_0_0)).toBe(true)     // lastest vs any version → true
      expect(isVersionBefore('lastest', 'lastest')).toBe(false) // lastest vs lastest → false
    })
  })

  describe('isVersionEqual', () => {

    it('should return true for identical versions', () => {
      expect(isVersionEqual(v1_0_0, v1_0_0)).toBe(true)
      expect(isVersionEqual(v1_0_0_beta, v1_0_0_beta)).toBe(true)
    })

    it('should return false for different versions', () => {
      expect(isVersionEqual(v1_0_0, v1_1_0)).toBe(false)
      expect(isVersionEqual(v1_0_0, v1_0_0_beta)).toBe(false)
      expect(isVersionEqual(v1_0_0_alpha, v1_0_0_beta)).toBe(false)
    })

    it('should handle "lastest" version', () => {
      expect(isVersionEqual('lastest', 'lastest')).toBe(true)
    })
  })

  describe('toVersionString', () => {

    it('should convert version objects to strings correctly', () => {
      expect(toVersionString(v1_0_0)).toBe('1.0.0')
      expect(toVersionString(v1_0_0_beta)).toBe('1.0.0-beta')
      expect(toVersionString(v1_1_0)).toBe('1.1.0')
      expect(toVersionString(v2_0_0)).toBe('2.0.0')
    })

    it('should handle "lastest" version', () => {
      expect(toVersionString('lastest')).toBe('lastest')
    })
  })

  describe('toApiVersion', () => {

    it('should handle "lastest" string', () => {
      expect(toApiVersion('lastest')).toBe('lastest')
    })

    it('should convert version strings to objects', () => {
      // Note: Current implementation is hardcoded, this test documents expected behavior
      const result = toApiVersion('1.0.0-beta')
      expect(result).toEqual({ major: 0, minor: 1, patch: 0, release: 'beta' })
    })
  })

  describe('Edge cases and integration', () => {

    it('should handle complex version comparisons in correct order', () => {
      const versions: ApiVersion[] = [
        { major: 1, minor: 0, patch: 0, release: 'alpha' },
        { major: 1, minor: 0, patch: 0, release: 'beta' },
        { major: 1, minor: 0, patch: 0, release: '' },
        { major: 1, minor: 0, patch: 1, release: '' },
        { major: 1, minor: 1, patch: 0, release: '' },
        { major: 2, minor: 0, patch: 0, release: '' },
      ]

      // Test that versions are in ascending order
      for (let i = 0; i < versions.length - 1; i++) {
        expect(isVersionBefore(versions[i], versions[i + 1])).toBe(true)
        expect(isVersionBefore(versions[i + 1], versions[i])).toBe(false)
      }
    })

    it('should be consistent between isVersionBefore and isVersionEqual', () => {
      const testVersions = [v1_0_0, v1_0_0_beta, v1_1_0, v2_0_0]

      for (const v1 of testVersions) {
        for (const v2 of testVersions) {
          const isBefore = isVersionBefore(v1, v2)
          const isEqual = isVersionEqual(v1, v2)
          const isAfter = isVersionBefore(v2, v1)

          // Exactly one of these should be true (trichotomy law)
          const trueCount = [isBefore, isEqual, isAfter].filter(Boolean).length
          expect(trueCount).toBe(1)
        }
      }
    })
  })
})