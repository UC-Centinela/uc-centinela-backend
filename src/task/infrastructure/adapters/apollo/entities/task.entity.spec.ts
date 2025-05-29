import { Task } from './task.entity'
import { TaskState } from '@task/domain/task'

describe('Task GraphQL Entity', () => {
  it('puede instanciar un objeto Task con sus campos', () => {
    const task = new Task()
    task.id = 1
    task.title = 'Tarea'
    task.instruction = 'Instrucciones'
    task.state = TaskState.PENDING
    task.creatorUserId = 2

    expect(task.title).toBe('Tarea')
    expect(task.state).toBe(TaskState.PENDING)
    expect(task.creatorUserId).toBe(2)
  })
})
