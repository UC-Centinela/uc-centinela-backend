import { CreateTaskInput } from './create-task.input'
import { TaskState } from '@task/domain/task'

describe('CreateTaskInput', () => {
  it('construye correctamente un Task mediante toDomain', () => {
    const input = new CreateTaskInput()
    input.title = 'Prueba'
    input.instruction = 'Instrucciones'
    input.state = TaskState.PENDING
    input.creatorUserId = 1

    const task = input.toDomain()
    expect(task.title).toBe('Prueba')
    expect(task.state).toBe(TaskState.PENDING)
    expect(task.creatorUserId).toBe(1)
  })
})
