import { Control } from './control'

describe('Control', () => {
  it('should create a new control', () => {
    const control = Control.create({
      title: 'Control title',
      description: 'Control desc',
      criticActivityId: 3
    })

    expect(control).toBeInstanceOf(Control)
    expect(control.title).toBe('Control title')
    expect(control.description).toBe('Control desc')
    expect(control.criticActivityId).toBe(3)
    expect(control.id).toBeUndefined()
  })

  it('should update a control', () => {
    const original = Control.create({
      title: 'Old title',
      description: 'Old desc',
      criticActivityId: 1
    })

    const updated = original.update({ title: 'New title' })

    expect(updated.title).toBe('New title')
    expect(updated.description).toBe('Old desc')
    expect(updated.criticActivityId).toBe(1)
  })

  it('should reconstitute a control from DB', () => {
    const control = Control.reconstitute({
      id: 20,
      title: 'From DB',
      description: 'stored',
      criticActivityId: 8
    })

    expect(control.id).toBe(20)
    expect(control.title).toBe('From DB')
    expect(control.description).toBe('stored')
    expect(control.criticActivityId).toBe(8)
  })
})
