import { type FormRegisterData, registerSchema } from '../register-schema'

describe('Register Schema', () => {
  describe('Valid data', () => {
    it('should validate correct register data', () => {
      const validData: FormRegisterData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }

      const result = registerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should validate with minimum length name', () => {
      const validData: FormRegisterData = {
        name: 'João',
        email: 'joao@example.com',
        password: '123456',
        confirmPassword: '123456',
      }

      const result = registerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should validate with minimum length password', () => {
      const validData: FormRegisterData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: '123456',
        confirmPassword: '123456',
      }

      const result = registerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should validate with accented characters in name', () => {
      const validData: FormRegisterData = {
        name: 'João Silva Santos',
        email: 'joao@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }

      const result = registerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should validate with multiple spaces in name', () => {
      const validData: FormRegisterData = {
        name: 'João  Silva  Santos',
        email: 'joao@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }

      const result = registerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })
  })

  describe('Invalid name', () => {
    it('should fail when name is empty', () => {
      const invalidData = {
        name: '',
        email: 'joao@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues[0].message).toBe('O nome é obrigatório')
        expect(result.error.issues[0].path).toEqual(['name'])
      }
    })

    it('should fail when name is too short', () => {
      const invalidData = {
        name: 'Jo',
        email: 'joao@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'O nome deve ter pelo menos 4 caracteres'
        )
        expect(result.error.issues[0].path).toEqual(['name'])
      }
    })

    it('should fail when name contains numbers', () => {
      const invalidData = {
        name: 'João123',
        email: 'joao@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'O nome não pode conter números ou caracteres especiais'
        )
        expect(result.error.issues[0].path).toEqual(['name'])
      }
    })

    it('should fail when name contains special characters', () => {
      const invalidData = {
        name: 'João@Silva',
        email: 'joao@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'O nome não pode conter números ou caracteres especiais'
        )
        expect(result.error.issues[0].path).toEqual(['name'])
      }
    })

    it('should fail when name is missing', () => {
      const invalidData = {
        email: 'joao@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('Invalid email', () => {
    it('should fail when email is invalid', () => {
      const invalidData = {
        name: 'João Silva',
        email: 'invalid-email',
        password: 'password123',
        confirmPassword: 'password123',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Digite um email válido')
        expect(result.error.issues[0].path).toEqual(['email'])
      }
    })

    it('should fail when email is empty', () => {
      const invalidData = {
        name: 'João Silva',
        email: '',
        password: 'password123',
        confirmPassword: 'password123',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should fail when email is missing', () => {
      const invalidData = {
        name: 'João Silva',
        password: 'password123',
        confirmPassword: 'password123',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should fail when email has no domain', () => {
      const invalidData = {
        name: 'João Silva',
        email: 'joao@',
        password: 'password123',
        confirmPassword: 'password123',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('Invalid password', () => {
    it('should fail when password is too short', () => {
      const invalidData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: '12345',
        confirmPassword: '12345',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'A senha deve ter pelo menos 6 caracteres'
        )
        expect(result.error.issues[0].path).toEqual(['password'])
      }
    })

    it('should fail when password is empty', () => {
      const invalidData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: '',
        confirmPassword: '',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should fail when password is missing', () => {
      const invalidData = {
        name: 'João Silva',
        email: 'joao@example.com',
        confirmPassword: 'password123',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('Password confirmation', () => {
    it('should fail when passwords do not match', () => {
      const invalidData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'password123',
        confirmPassword: 'differentpassword',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          'As senhas não se coincidem'
        )
        expect(result.error.issues[0].path).toEqual(['confirmPassword'])
      }
    })

    it('should fail when confirmPassword is missing', () => {
      const invalidData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'password123',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should fail when confirmPassword is empty', () => {
      const invalidData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'password123',
        confirmPassword: '',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })

  describe('Multiple validation errors', () => {
    it('should return multiple errors for invalid data', () => {
      const invalidData = {
        name: 'Jo',
        email: 'invalid-email',
        password: '123',
        confirmPassword: 'different',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1)
      }
    })

    it('should return all required field errors when data is empty', () => {
      const invalidData = {}

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)

      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThanOrEqual(4)
      }
    })
  })

  describe('Edge cases', () => {
    it('should handle whitespace-only name', () => {
      const invalidData = {
        name: '   ',
        email: 'joao@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }

      const result = registerSchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })

    it('should handle very long strings', () => {
      const longString = 'a'.repeat(1000)
      const validData: FormRegisterData = {
        name: 'João Silva',
        email: `${longString}@example.com`,
        password: longString,
        confirmPassword: longString,
      }

      const result = registerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should handle case sensitivity in email', () => {
      const validData: FormRegisterData = {
        name: 'João Silva',
        email: 'JOAO@EXAMPLE.COM',
        password: 'password123',
        confirmPassword: 'password123',
      }

      const result = registerSchema.safeParse(validData)
      expect(result.success).toBe(true)
    })
  })

  describe('Type inference', () => {
    it('should correctly infer FormRegisterData type', () => {
      const data: FormRegisterData = {
        name: 'João Silva',
        email: 'joao@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }

      expect(typeof data.name).toBe('string')
      expect(typeof data.email).toBe('string')
      expect(typeof data.password).toBe('string')
      expect(typeof data.confirmPassword).toBe('string')
    })
  })
})
