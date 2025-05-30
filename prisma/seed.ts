import { PrismaClient } from '@prisma/client';
import { Role } from '../src/user/domain/user';
import { TaskState } from '../src/task/domain/task';

const prisma = new PrismaClient();

async function createCustomer() {
  return prisma.customer.upsert({
    where: { email: 'contacto@centinela.cl' },
    update: {},
    create: {
      name: 'Minera Centinela',
      email: 'contacto@centinela.cl',
      industry: 'Minería',
    },
  });
}

async function createAdminUsers(customerId: number) {
  const adminUsers = [
    { firstName: 'Daniel', lastName: 'Astudillo', email: 'diego.astudillo@uc.cl', role: Role.ADMIN, rut: '12345678-9', customerId },
    { firstName: 'Domingo', lastName: 'Agüero', email: 'domingo.aguero@uc.cl', role: Role.ADMIN, rut: '12345679-7', customerId },
    { firstName: 'Luis', lastName: 'Camus', email: 'lucascamus01@gmail.com', role: Role.ADMIN, rut: '12345680-0', customerId },
    { firstName: 'Robin', lastName: 'Eagle', email: 'reagle717@gmail.com', role: Role.ADMIN, rut: '12345681-9', customerId },
    { firstName: 'Bernardo', lastName: 'Aguila', email: 'benjaaguilaruiz@gmail.com', role: Role.ADMIN, rut: '12345682-7', customerId }
  ];
  
  const createdUsers = [];
  for (const user of adminUsers) {
    try {
      const createdUser = await prisma.user.upsert({
        where: { email: user.email },
        update: user,
        create: user,
      });
      createdUsers.push(createdUser);
    } catch (error) {
      console.error(`Error creating admin user ${user.email}:`, error.message);
    }
  }
  return createdUsers;
}

async function createOperatorUsers(customerId: number) {
  const operatorUsers = [
    { firstName: 'Lucas', lastName: 'Camus', email: 'lcamusm@uc.cl', role: Role.OPERATOR, rut: '12345683-5', customerId },
    { firstName: 'Benjamin', lastName: 'Aguila', email: 'benjaaguilaruiz@uc.cl', role: Role.OPERATOR, rut: '12345684-3', customerId },
    { firstName: 'Diego', lastName: 'Astudillo', email: 'd.astudillo.v@gmail.com', role: Role.OPERATOR, rut: '12345685-1', customerId },
    { firstName: 'Agustin', lastName: 'Gonzalez', email: 'agustin717@uc.cl', role: Role.OPERATOR, rut: '12345686-X', customerId }
  ];
  
  const createdUsers = [];
  for (const user of operatorUsers) {
    try {
      const createdUser = await prisma.user.upsert({
        where: { email: user.email },
        update: user,
        create: user,
      });
      createdUsers.push(createdUser);
    } catch (error) {
      console.error(`Error creating operator user ${user.email}:`, error.message);
    }
  }
  return createdUsers;
}

function getTaskTemplates() {
  return [
    {
      title: 'Posicionamiento de cable minero eléctrico sobre el pretil utilizando equipo de apoyo',
      instruction: 'Realizar el posicionamiento del cable minero eléctrico sobre el pretil siguiendo los procedimientos de seguridad establecidos. Utilizar el equipo de apoyo asignado y documentar el proceso con fotografías.',
      comments: 'Tarea prioritaria para la operación continua del sector norte.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Depositación hidráulica de arenas (Tranque Mauro)',
      instruction: 'Ejecutar el proceso de depositación hidráulica de arenas en el Tranque Mauro, verificando los parámetros de presión y flujo según el manual operativo.',
      comments: 'Monitorear constantemente los niveles de presión durante la operación.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Operación carga, traslado y descarga de material con camión tolva',
      instruction: 'Realizar la operación completa de carga, traslado y descarga de material utilizando camión tolva en áreas externas al botadero de ripios. Seguir protocolo de seguridad para transporte de materiales.',
      comments: 'Verificar el estado del camión antes de iniciar la operación.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Inspección de sistema de bombeo de agua de proceso',
      instruction: 'Realizar inspección completa del sistema de bombeo de agua de proceso, incluyendo verificación de sellos, acoples, y funcionamiento general.',
      comments: 'Documentar cualquier anomalía encontrada con fotografías.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Mantención preventiva de correas transportadoras',
      instruction: 'Ejecutar el plan de mantención preventiva para las correas transportadoras del sector 5, incluyendo tensión, alineación y limpieza de rodillos.',
      comments: 'Utilizar los EPP específicos para trabajo en altura.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Inspección de líneas de relaves',
      instruction: 'Realizar recorrido de inspección por las líneas de relaves, verificando integridad, puntos de desgaste y posibles filtraciones.',
      comments: 'Marcar con GPS los puntos que requieran intervención.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Verificación de parámetros operacionales en espesadores',
      instruction: 'Verificar y registrar los parámetros operacionales de los espesadores de concentrado, incluyendo densidad, nivel de cama y torque.',
      comments: 'Los valores deben estar dentro de los rangos establecidos en el manual de operación.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Toma de muestras de agua en puntos de control ambiental',
      instruction: 'Realizar la toma de muestras de agua en los 12 puntos de control ambiental según protocolo establecido. Preservar las muestras adecuadamente para su análisis.',
      comments: 'Utilizar los recipientes estériles proporcionados por el laboratorio.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Inspección de sistema contra incendios',
      instruction: 'Realizar inspección completa del sistema contra incendios en planta de chancado, verificando extintores, red húmeda y señalética.',
      comments: 'Reportar inmediatamente cualquier extintor con carga insuficiente.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Verificación de instrumentación en planta de flotación',
      instruction: 'Verificar el correcto funcionamiento de los instrumentos de medición en la planta de flotación, incluyendo caudalímetros, densímetros y sensores de nivel.',
      comments: 'Calibrar los instrumentos que presenten desviaciones según procedimiento.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Revisión de sistema hidráulico en equipos de carguío',
      instruction: 'Realizar revisión completa del sistema hidráulico en equipos de carguío, verificando niveles de aceite, fugas y estado de mangueras.',
      comments: 'Priorizar la revisión de los equipos con mayor tiempo de operación.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Inspección de taludes en rajo',
      instruction: 'Realizar inspección visual de taludes en el rajo según procedimiento de seguridad geotécnica, identificando posibles inestabilidades.',
      comments: 'Utilizar binoculares para zonas de difícil acceso y reportar inmediatamente cualquier anomalía.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Mantención de sistema de ventilación en planta de chancado',
      instruction: 'Ejecutar plan de mantención preventiva del sistema de ventilación en planta de chancado, incluyendo limpieza de filtros y verificación de motores.',
      comments: 'Utilizar respirador con filtro para partículas durante toda la operación.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Calibración de balanzas en planta de filtrado',
      instruction: 'Realizar calibración de las balanzas en planta de filtrado utilizando pesos patrón certificados, según procedimiento de metrología.',
      comments: 'Registrar los resultados en el sistema de control de calidad.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Inspección de líneas eléctricas en subestación principal',
      instruction: 'Realizar inspección visual de líneas eléctricas en subestación principal, verificando estado de aisladores y conexiones.',
      comments: 'Trabajo debe realizarse con sistema desenergizado y aplicando bloqueo LOTO.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Limpieza de chutes en sistema de chancado',
      instruction: 'Ejecutar limpieza de chutes en sistema de chancado primario y secundario, eliminando acumulaciones de material que puedan causar atollos.',
      comments: 'Utilizar herramientas antichispa y seguir procedimiento de trabajo en espacios confinados.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Revisión de sistema de lubricación en molinos',
      instruction: 'Verificar el correcto funcionamiento del sistema de lubricación en molinos, incluyendo bombas, filtros y enfriadores.',
      comments: 'Tomar muestras de aceite para análisis de laboratorio.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Inspección de caminos de operación en mina',
      instruction: 'Realizar inspección de caminos de operación en mina, verificando estado de carpeta, bermas y señalización.',
      comments: 'Priorizar zonas de alto tráfico y reportar inmediatamente condiciones inseguras.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Mantención de bombas de pulpa en espesadores',
      instruction: 'Ejecutar mantención preventiva de bombas de pulpa en espesadores, incluyendo cambio de sellos, revisión de rodamientos y alineación.',
      comments: 'Coordinar con operaciones para realizar by-pass durante la intervención.',
      changeHistory: 'Creación inicial de la tarea.'
    },
    {
      title: 'Revisión de sistema de control de polvo en chancador primario',
      instruction: 'Verificar funcionamiento del sistema de control de polvo en chancador primario, incluyendo aspersores, bombas y filtros.',
      comments: 'Ajustar caudal de agua según condiciones ambientales.',
      changeHistory: 'Creación inicial de la tarea.'
    }
  ];
}

async function createTasks(adminUsers, operatorUsers) {
  const taskTemplates = getTaskTemplates();
  const taskStates = [TaskState.PENDING, TaskState.IN_PROGRESS, TaskState.COMPLETED, TaskState.REVIEWED];
  const tasksPerState = 10;
  const createdTasks = [];
  
  for (let stateIndex = 0; stateIndex < taskStates.length; stateIndex++) {
    const state = taskStates[stateIndex];
    
    for (let i = 0; i < tasksPerState; i++) {
      try {
        const taskTemplate = taskTemplates[i % taskTemplates.length];
        const taskData = prepareTaskData(taskTemplate, state, i, adminUsers, operatorUsers);
        
        const createdTask = await prisma.task.create({
          data: taskData
        });
        
        createdTasks.push(createdTask);
      } catch (error) {
        console.error(`Error creating task with state ${state}:`, error.message);
      }
    }
  }
  
  return createdTasks;
}

function prepareTaskData(taskTemplate, state, index, adminUsers, operatorUsers) {
  let assignationDate = new Date();
  let requiredSendDate = new Date(new Date().setDate(new Date().getDate() + 14));
  let changeHistory = taskTemplate.changeHistory;

  if (state === TaskState.COMPLETED || state === TaskState.REVIEWED) {
    assignationDate = new Date(new Date().setDate(new Date().getDate() - 15));
    requiredSendDate = new Date(new Date().setDate(new Date().getDate() - 5));
    changeHistory += ' | Tarea completada y enviada para revisión.';

    if (state === TaskState.REVIEWED) {
      changeHistory += ' | Revisión aprobada.';
    }
  } else if (state === TaskState.IN_PROGRESS) {
    changeHistory += ' | Trabajo iniciado.';
  }

  const creatorIndex = index % operatorUsers.length;
  const revisorIndex = index % adminUsers.length;
  const creator = operatorUsers[creatorIndex];
  let revisor = adminUsers[revisorIndex];

  if (creator.id === revisor.id) {
    revisor = adminUsers[(revisorIndex + 1) % adminUsers.length];
  }

  return {
    title: taskTemplate.title,
    instruction: taskTemplate.instruction,
    state: state,
    comments: taskTemplate.comments,
    assignationDate: assignationDate,
    requiredSendDate: requiredSendDate,
    changeHistory: changeHistory,
    creatorUserId: creator.id,
    revisorUserId: revisor.id
  };
}

async function createCriticActivities(tasks) {
  const criticActivities = [];
  
  for (const task of tasks) {
    try {
      const criticActivity = await prisma.criticActivity.create({
        data: {
          title: `Actividad crítica para ${task.title}`,
          taskId: task.id
        }
      });
      criticActivities.push(criticActivity);
    } catch (error) {
      console.error(`Error creating critic activity for task ${task.id}:`, error.message);
    }
  }
  
  return criticActivities;
}

async function createControlStrategies(tasks) {
  const strategyTemplates = [
    'Estrategia de control preventivo',
    'Estrategia de control correctivo',
    'Estrategia de control detectivo',
    'Estrategia de control predictivo',
    'Estrategia de control de barrera',
    'Estrategia de control de mitigación',
    'Estrategia de control de eliminación',
    'Estrategia de control de sustitución',
    'Estrategia de control administrativo',
    'Estrategia de control de ingeniería'
  ];
  
  for (let i = 0; i < 30; i++) {
    try {
      const randomTaskIndex = Math.floor(Math.random() * tasks.length);
      const randomTask = tasks[randomTaskIndex];
      const strategyTitle = `${strategyTemplates[i % strategyTemplates.length]} - ${i + 1}`;
      
      await prisma.controlStrategy.create({
        data: {
          title: strategyTitle,
          taskId: randomTask.id
        }
      });
    } catch (error) {
      console.error(`Error creating control strategy:`, error.message);
    }
  }
}

async function createControls(criticActivities) {
  const controlTemplates = [
    'Control de acceso a áreas restringidas',
    'Verificación de equipos de protección personal',
    'Inspección de herramientas y equipos',
    'Monitoreo de condiciones ambientales',
    'Verificación de procedimientos operativos',
    'Control de sustancias peligrosas',
    'Inspección de sistemas eléctricos',
    'Verificación de sistemas hidráulicos',
    'Control de bloqueo y etiquetado',
    'Monitoreo de fatiga del personal',
    'Verificación de comunicaciones',
    'Control de permisos de trabajo',
    'Inspección de sistemas contra incendios',
    'Verificación de señalización',
    'Control de elementos de izaje'
  ];
  
  for (let i = 0; i < 40; i++) {
    try {
      const randomActivityIndex = Math.floor(Math.random() * criticActivities.length);
      const randomActivity = criticActivities[randomActivityIndex];
      const controlTitle = controlTemplates[i % controlTemplates.length];
      const controlDescription = `Descripción detallada para el control: ${controlTitle}`;
      
      await prisma.control.create({
        data: {
          title: controlTitle,
          description: controlDescription,
          criticActivityId: randomActivity.id
        }
      });
    } catch (error) {
      console.error(`Error creating control:`, error.message);
    }
  }
}

async function createUndesiredEvents(criticActivities) {
  const eventTemplates = [
    'Caída de personas a distinto nivel',
    'Caída de personas al mismo nivel',
    'Caída de objetos por desplome',
    'Caída de objetos por manipulación',
    'Caída de objetos desprendidos',
    'Pisadas sobre objetos',
    'Choques contra objetos inmóviles',
    'Choques contra objetos móviles',
    'Golpes/cortes por objetos o herramientas',
    'Proyección de fragmentos o partículas',
    'Atrapamiento por o entre objetos',
    'Atrapamiento por vuelco de máquinas',
    'Sobreesfuerzos',
    'Exposición a temperaturas extremas',
    'Contactos térmicos',
    'Contactos eléctricos',
    'Exposición a sustancias nocivas',
    'Contactos con sustancias cáusticas',
    'Exposición a radiaciones',
    'Explosiones',
    'Incendios',
    'Accidentes causados por seres vivos',
    'Atropellos o golpes con vehículos'
  ];
  
  for (let i = 0; i < 35; i++) {
    try {
      const randomActivityIndex = Math.floor(Math.random() * criticActivities.length);
      const randomActivity = criticActivities[randomActivityIndex];
      const eventTitle = eventTemplates[i % eventTemplates.length];
      const eventDescription = `Descripción detallada para el evento no deseado: ${eventTitle}`;
      
      await prisma.undesiredEvent.create({
        data: {
          title: eventTitle,
          description: eventDescription,
          criticActivityId: randomActivity.id
        }
      });
    } catch (error) {
      console.error(`Error creating undesired event:`, error.message);
    }
  }
}

function printTaskStatistics(tasks, adminUsers) {
  const taskStates = [TaskState.PENDING, TaskState.IN_PROGRESS, TaskState.COMPLETED, TaskState.REVIEWED];
  const taskCounts = {};
  
  for (const state of taskStates) {
    taskCounts[state] = tasks.filter(task => task.state === state).length;
  }
  
  console.log('Tasks by state:', taskCounts);
  
  const adminCreatedTasks = tasks.filter(task => {
    return adminUsers.some(admin => admin.id === task.creatorUserId);
  }).length;
  
  console.log(`Tasks created by ADMIN users: ${adminCreatedTasks}`);
  console.log(`Tasks created by OPERATOR users: ${tasks.length - adminCreatedTasks}`);
}

async function main() {
  try {
    console.log('Starting seed process...');
    
    const customer = await createCustomer();
    console.log(`Customer created with ID: ${customer.id}`);
    
    console.log('Creating ADMIN users...');
    const adminUsers = await createAdminUsers(customer.id);
    
    console.log('Creating OPERATOR users...');
    const operatorUsers = await createOperatorUsers(customer.id);
    
    console.log('Creating tasks with different states...');
    const tasks = await createTasks(adminUsers, operatorUsers);
    
    console.log('Creating critic activities...');
    const criticActivities = await createCriticActivities(tasks);
    
    console.log('Creating control strategies...');
    await createControlStrategies(tasks);
    
    console.log('Creating controls...');
    await createControls(criticActivities);
    
    console.log('Creating undesired events...');
    await createUndesiredEvents(criticActivities);
    
    console.log('✅ Seed completed successfully');
    console.log(`Created ${tasks.length} tasks in total:`);
    
    printTaskStatistics(tasks, adminUsers);
    
  } catch (error) {
    console.error('❌ Error during seed process:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
