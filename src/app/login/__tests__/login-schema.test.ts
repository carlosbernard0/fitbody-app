import { type FormLoginData, loginSchema } from '../login-schema'

describe('Login Schema', () => {
  describe('Valid data', () => {
    it('should validate correct login data', () => {
      const validData: FormLoginData = {
        login: 'testuser',
        password: 'password123',
      }

      const result = loginSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should validate with email as login', () => {
      const validData: FormLoginData = {
        login: 'test@example.com',
        password: 'password123',
      }

      const result = loginSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should validate with minimum length values', () => {
      const validData: FormLoginData = {
        login: 'a',
        password: 'b',
      }

      const result = loginSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })
  })

  describe('Invalid data', () => {
    it('should fail when login is empty', () => {
      const invalidData = {
        login: '',
        password: 'password123',
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Login is required')
        expect(result.error.issues[0].path).toEqual(['login'])
      }
    })

    it('should fail when password is empty', () => {
      const invalidData = {
        login: 'testuser',
        password: '',
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Password is required')
        expect(result.error.issues[0].path).toEqual(['password'])
      }
    })

    it('should fail when login is missing', () => {
      const invalidData = {
        password: 'password123',
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Required')
        expect(result.error.issues[0].path).toEqual(['login'])
      }
    })

    it('should fail when password is missing', () => {
      const invalidData = {
        login: 'testuser',
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Required')
        expect(result.error.issues[0].path).toEqual(['password'])
      }
    })

    it('should fail when both fields are missing', () => {
      const invalidData = {}

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues).toHaveLength(2)
        expect(result.error.issues[0].path).toEqual(['login'])
        expect(result.error.issues[1].path).toEqual(['password'])
      }
    })

    it('should fail when login is null', () => {
      const invalidData = {
        login: null,
        password: 'password123',
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should fail when password is null', () => {
      const invalidData = {
        login: 'testuser',
        password: null,
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should fail when login is undefined', () => {
      const invalidData = {
        login: undefined,
        password: 'password123',
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should fail when password is undefined', () => {
      const invalidData = {
        login: 'testuser',
        password: undefined,
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('Edge cases', () => {
    it('should handle whitespace-only login', () => {
      const invalidData = {
        login: '   ',
        password: 'password123',
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(true) // Zod não valida espaços em branco por padrão
    })

    it('should handle whitespace-only password', () => {
      const invalidData = {
        login: 'testuser',
        password: '   ',
      }

      const result = loginSchema.safeParse(invalidData)
      expect(result.success).toBe(true) // Zod não valida espaços em branco por padrão
    })

    it('should handle very long strings', () => {
      const longString = 'a'.repeat(1000)
      const validData: FormLoginData = {
        login: longString,
        password: longString,
      }

      const result = loginSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should handle special characters', () => {
      const validData: FormLoginData = {
        login: 'user@domain.com!@#$%^&*()',
        password: 'pass!@#$%^&*()',
      }

      const result = loginSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })
  })

  describe('Type inference', () => {
    it('should correctly infer FormLoginData type', () => {
      const data: FormLoginData = {
        login: 'testuser',
        password: 'password123',
      }

      expect(typeof data.login).toBe('string')
      expect(typeof data.password).toBe('string')
    })
  })
})
