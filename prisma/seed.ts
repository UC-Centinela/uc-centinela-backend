import { PrismaClient, TaskState } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Mock Users
  const users = [
    { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', role: 'ADMIN' },
    { firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', role: 'USER' },
    { firstName: 'Charlie', lastName: 'Brown', email: 'charlie@example.com', role: 'REVISOR' },
  ]

  for (const user of users) {
    await prisma.user.create({
      data: user,
    })
  }

  // Mock Tasks
  const tasks = [
    { title: 'Task 1', instruction: 'Complete the report', creatorUserId: 1, state: TaskState.PENDING },
    { title: 'Task 2', instruction: 'Review the document', creatorUserId: 2, state: TaskState.IN_PROGRESS },
    { title: 'Task 3', instruction: 'Submit the draft', creatorUserId: 3, state: TaskState.COMPLETED },
    { title: 'Task 4', instruction: 'Complete the report', creatorUserId: 1, state: TaskState.PENDING },
    { title: 'Task 5', instruction: 'Review the document', creatorUserId: 2, state: TaskState.IN_PROGRESS },
    { title: 'Task 6', instruction: 'Submit the draft', creatorUserId: 3, state: TaskState.COMPLETED },
    { title: 'Task 7', instruction: 'Complete the report', creatorUserId: 1, state: TaskState.PENDING },
    { title: 'Task 8', instruction: 'Review the document', creatorUserId: 2, state: TaskState.IN_PROGRESS },
    { title: 'Task 9', instruction: 'Submit the draft', creatorUserId: 3, state: TaskState.COMPLETED },
    { title: 'Task 10', instruction: 'Complete the report', creatorUserId: 1, state: TaskState.PENDING },
  ]

  for (const task of tasks) {
    await prisma.task.create({
      data: task,
    })
  }
}

main()
  .then(() => {
    console.log('✅ Seed completed');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })