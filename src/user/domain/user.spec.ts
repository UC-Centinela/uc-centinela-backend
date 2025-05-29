import { User, Role } from './user'

describe('User', () => {
  const baseProps = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    customerId: 1
  }

  describe('User Creation', () => {
    it('should create a user with default role', () => {
      const user = User.create(baseProps)
      expect(user.fullName).toBe('Jane Doe')
      expect(user.email).toBe('jane@example.com')
      expect(user.role).toBe(Role.GUEST)
    })

    it('should create a user with a specific role', () => {
      const user = User.create({ ...baseProps, role: Role.ADMIN })
      expect(user.role).toBe(Role.ADMIN)
    })

    it('should throw error on invalid email - no @', () => {
      expect(() => User.create({ ...baseProps, email: 'invalid-email' }))
        .toThrow('Invalid email')
    })

    it('should throw error on invalid email - empty string', () => {
      expect(() => User.create({ ...baseProps, email: '' }))
        .toThrow('Invalid email')
    })

    it('should throw error on invalid email - only @', () => {
      expect(() => User.create({ ...baseProps, email: '@' }))
        .toThrow('Invalid email')
    })
  })

  describe('User Properties', () => {
    it('should format full name correctly', () => {
      const user = User.create(baseProps)
      expect(user.fullName).toBe('Jane Doe')
    })

    it('should format full name with single character names', () => {
      const user = User.create({ ...baseProps, firstName: 'J', lastName: 'D' })
      expect(user.fullName).toBe('J D')
    })

    it('should handle long names correctly', () => {
      const user = User.create({
        ...baseProps,
        firstName: 'Maria Jose Ana',
        lastName: 'Gonzalez Rodriguez'
      })
      expect(user.fullName).toBe('Maria Jose Ana Gonzalez Rodriguez')
    })
  })

  describe('User Updates', () => {
    it('should update single property', () => {
      const user = User.create(baseProps)
      const updated = user.update({ firstName: 'Alice' })

      expect(updated.firstName).toBe('Alice')
      expect(updated.lastName).toBe('Doe')
      expect(updated.email).toBe('jane@example.com')
    })

    it('should update multiple properties', () => {
      const user = User.create(baseProps)
      const updated = user.update({
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com'
      })

      expect(updated.firstName).toBe('Alice')
      expect(updated.lastName).toBe('Smith')
      expect(updated.email).toBe('alice@example.com')
      expect(updated.customerId).toBe(1)
    })

    it('should maintain immutability after updates', () => {
      const user = User.create(baseProps)
      const updated = user.update({ firstName: 'Alice' })

      expect(user.firstName).toBe('Jane')
      expect(updated.firstName).toBe('Alice')
    })
  })

  describe('User Reconstitution', () => {
    it('should reconstitute a user with full props', () => {
      const now = new Date()
      const user = User.reconstitute({
        id: 5,
        idpId: 'auth0|abc',
        role: Role.SUPERADMIN,
        firstName: 'Max',
        lastName: 'Payne',
        email: 'max@admin.com',
        customerId: 2,
        lastLogin: now,
        rut: '11.111.111-1'
      })

      expect(user.id).toBe(5)
      expect(user.idpId).toBe('auth0|abc')
      expect(user.role).toBe(Role.SUPERADMIN)
      expect(user.fullName).toBe('Max Payne')
      expect(user.lastLogin).toBe(now)
      expect(user.rut).toBe('11.111.111-1')
    })

    it('should reconstitute a user with minimal props', () => {
      const user = User.reconstitute({
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@example.com',
        customerId: 3
      })

      expect(user.id).toBeUndefined()
      expect(user.idpId).toBeUndefined()
      expect(user.role).toBeUndefined()
      expect(user.lastLogin).toBeUndefined()
      expect(user.rut).toBeUndefined()
      expect(user.fullName).toBe('John Smith')
    })
  })
})
