import { User, Role } from './user'

describe('User', () => {
  const baseProps = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    customerId: 1
  }

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

  it('should throw error on invalid email', () => {
    expect(() => User.create({ ...baseProps, email: 'invalid-email' }))
      .toThrow('Invalid email')
  })

  it('should update user properties', () => {
    const user = User.create(baseProps)
    const updated = user.update({ firstName: 'Alice' })

    expect(updated.firstName).toBe('Alice')
    expect(updated.lastName).toBe('Doe')
  })

  it('should reconstitute a user with full props', () => {
    const user = User.reconstitute({
      id: 5,
      idpId: 'auth0|abc',
      role: Role.SUPERADMIN,
      firstName: 'Max',
      lastName: 'Payne',
      email: 'max@admin.com',
      customerId: 2,
      lastLogin: new Date('2024-01-01'),
      rut: '11.111.111-1'
    })

    expect(user.id).toBe(5)
    expect(user.idpId).toBe('auth0|abc')
    expect(user.role).toBe(Role.SUPERADMIN)
    expect(user.fullName).toBe('Max Payne')
    expect(user.lastLogin).toBeInstanceOf(Date)
    expect(user.rut).toBe('11.111.111-1')
  })
})
