import { Task, TaskState } from './task'

describe('Task (Domain Entity)', () => {
  const baseProps = {
    title: 'Tarea de prueba',
    instruction: 'Instrucciones detalladas',
    state: TaskState.PENDING,
    creatorUserId: 1,
    comments: 'Comentario',
    changeHistory: 'Historia',
    assignationDate: new Date(),
    requiredSendDate: new Date(),
    revisorUserId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  it('crea una tarea válida con create', () => {
    const task = Task.create({
      ...baseProps
    })

    expect(task.title).toBe(baseProps.title)
    expect(task.instruction).toBe(baseProps.instruction)
    expect(task.state).toBe(TaskState.PENDING)
    expect(task.creatorUserId).toBe(1)
  })

  it('reconstituye correctamente una tarea', () => {
    const reconstituida = Task.reconstitute({
      id: 5,
      ...baseProps
    })

    expect(reconstituida.id).toBe(5)
    expect(reconstituida.comments).toBe(baseProps.comments)
    expect(reconstituida.revisorUserId).toBe(2)
  })

  it('actualiza parcialmente una tarea con update', () => {
    const task = Task.reconstitute({ id: 1, ...baseProps })
    const updated = task.update({ title: 'Nuevo título' })

    expect(updated.title).toBe('Nuevo título')
    expect(updated.id).toBe(1)
  })
})
