import { PrismaClient, TaskState } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const customer = await prisma.customer.upsert({
    where: { email: 'contacto@centinela.cl' },
    update: {},
    create: {
      name: 'Minera Centinela',
      email: 'contacto@centinela.cl',
      industry: 'Minería',
    },
  })

  // Mock Users
  const users = [
    { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', role: 'ADMIN', rut: '12345678', customerId: customer.id },
    { firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', role: 'USER', rut: '12345678', customerId: customer.id },
    { firstName: 'Charlie', lastName: 'Brown', email: 'charlie@example.com', role: 'REVISOR', rut: '12345678', customerId: customer.id },
  ]

  for (const user of users) {
    await prisma.user.create({ data: user })
  }

  const userAlice = await prisma.user.findUnique({ where: { email: 'alice@example.com' } })
  const userBob = await prisma.user.findUnique({ where: { email: 'bob@example.com' } })
  const userCharlie = await prisma.user.findUnique({ where: { email: 'charlie@example.com' } })

  // Mock Tasks
  const tasks = [
    { title: 'Task 1', instruction: 'Complete the report', creatorUserId: userAlice?.id!, state: TaskState.PENDING },
    { title: 'Task 2', instruction: 'Review the document', creatorUserId: userBob?.id!, state: TaskState.IN_PROGRESS },
    { title: 'Task 3', instruction: 'Submit the draft', creatorUserId: userCharlie?.id!, state: TaskState.COMPLETED },
  ]

  for (const task of tasks) {
    await prisma.task.create({ data: task })
  }

  const allTasks = await prisma.task.findMany()

  // Critic Activities
  for (const [i, task] of allTasks.entries()) {
    await prisma.criticActivity.create({
      data: {
        title: `Actividad crítica ${i + 1}`,
        taskId: task.id
      }
    })
  }

  const allCriticActivities = await prisma.criticActivity.findMany()

  // Multimedia
  for (const [i, task] of allTasks.entries()) {
    await prisma.multimedia.create({
      data: {
        taskId: task.id,
        photoUrl: `https://cdn.fotos.com/${i + 1}.jpg`,
        videoUrl: `https://cdn.videos.com/${i + 1}.mp4`,
        audioTranscription: `Transcripción simulada ${i + 1}`
      }
    })
  }

  // Control Strategies
  for (const [i, task] of allTasks.entries()) {
    await prisma.controlStrategy.create({
      data: {
        taskId: task.id,
        title: `Estrategia de control ${i + 1}`
      }
    })
  }

  // Controls
  for (const [i, activity] of allCriticActivities.entries()) {
    await prisma.control.create({
      data: {
        criticActivityId: activity.id,
        title: `Control ${i + 1}`,
        description: `Descripción del control ${i + 1}`
      }
    })
  }

  // Undesired Events
  for (const [i, activity] of allCriticActivities.entries()) {
    await prisma.undesiredEvent.create({
      data: {
        criticActivityId: activity.id,
        title: `Evento no deseado ${i + 1}`,
        description: `Descripción del evento ${i + 1}`
      }
    })
  }

  // Verification Questions
  for (const [i, activity] of allCriticActivities.entries()) {
    await prisma.verificationQuestion.create({
      data: {
        criticActivityId: activity.id,
        title: `¿Pregunta de verificación ${i + 1}?`,
        description: `Descripción de la pregunta ${i + 1}`
      }
    })
  }
}

main()
  .then(() => {
    console.log('✅ Seed completed')
    return prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
