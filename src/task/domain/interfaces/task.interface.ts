import { Task, TaskState } from '../task'

export interface CreateTaskDTO {
  title: string;
  instruction: string;
  comments?: string;
  state: TaskState;
  assignationDate?: Date;
  requiredSendDate?: Date;
  creatorUserId: number;
  revisorUserId?: number;
  changeHistory?: string;
}

export interface UpdateTaskDTO {
  id: number;
  updateTask: Partial<CreateTaskDTO>;
}

export interface ITaskService {
  create(dto: CreateTaskDTO): Promise<Task>;
  findAll(): Promise<Task[]>;
  findOne(id: number, userEmail?: string): Promise<Task>;
  update(dto: UpdateTaskDTO): Promise<Task>;
  delete(id: number): Promise<boolean>;
  findAllByUserId(userId: number): Promise<Task[]>;
  findAllByReviewerId(revisorId: number): Promise<Task[]>;
}
