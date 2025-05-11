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
  });

  // Mock Users
  const users = [
    { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', role: 'ADMIN', rut: '12345678', customerId: customer.id },
    { firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', role: 'USER', rut: '12345678', customerId: customer.id },
    { firstName: 'Charlie', lastName: 'Brown', email: 'charlie@example.com', role: 'REVISOR', rut: '12345678', customerId: customer.id },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,

    });
  }

  
  const userAlice = await prisma.user.findUnique({ where: { email: 'alice@example.com' } });
  const userBob = await prisma.user.findUnique({ where: { email: 'bob@example.com' } });
  const userCharlie = await prisma.user.findUnique({ where: { email: 'charlie@example.com' } });

  // Mock Tasks
  const tasks = [
    { title: 'Task 1', instruction: 'Complete the report', creatorUserId: userAlice?.id!, state: TaskState.PENDING },
    { title: 'Task 2', instruction: 'Review the document', creatorUserId: userBob?.id!, state: TaskState.IN_PROGRESS },
    { title: 'Task 3', instruction: 'Submit the draft', creatorUserId: userCharlie?.id!, state: TaskState.COMPLETED },
    { title: 'Task 4', instruction: 'Complete the report', creatorUserId: userAlice?.id!, state: TaskState.PENDING },
    { title: 'Task 5', instruction: 'Review the document', creatorUserId: userBob?.id!, state: TaskState.IN_PROGRESS },
    { title: 'Task 6', instruction: 'Submit the draft', creatorUserId: userCharlie?.id!, state: TaskState.COMPLETED },
    { title: 'Task 7', instruction: 'Complete the report', creatorUserId: userAlice?.id!, state: TaskState.PENDING },
    { title: 'Task 8', instruction: 'Review the document', creatorUserId: userBob?.id!, state: TaskState.IN_PROGRESS },
    { title: 'Task 9', instruction: 'Submit the draft', creatorUserId: userCharlie?.id!, state: TaskState.COMPLETED },
    { title: 'Task 10', instruction: 'Complete the report', creatorUserId: userAlice?.id!, state: TaskState.PENDING },
  ];

  for (const task of tasks) {
    await prisma.task.create({
      data: task,

    });
  }
}

main()
  .then(() => {
    console.log('✅ Seed completed');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

