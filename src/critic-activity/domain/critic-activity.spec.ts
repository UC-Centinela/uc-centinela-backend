import { CriticActivity } from './critic-activity'

describe('CriticActivity', () => {
  it('should create a new critic activity', () => {
    const activity = CriticActivity.create({ title: 'Test', taskId: 1 })
    expect(activity).toBeInstanceOf(CriticActivity)
    expect(activity.title).toBe('Test')
    expect(activity.taskId).toBe(1)
    expect(activity.id).toBeUndefined()
  })

  it('should update a critic activity', () => {
    const original = CriticActivity.create({ title: 'Original', taskId: 1 })
    const updated = original.update({ title: 'Updated' })

    expect(updated.title).toBe('Updated')
    expect(updated.taskId).toBe(1)
  })

  it('should reconstitute a critic activity with id', () => {
    const activity = CriticActivity.reconstitute({ id: 10, title: 'Persisted', taskId: 2 })
    expect(activity.id).toBe(10)
    expect(activity.title).toBe('Persisted')
    expect(activity.taskId).toBe(2)
  })
})
