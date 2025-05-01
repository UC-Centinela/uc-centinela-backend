interface TaskProps {
  id?: number;
  title: string;
  instruction: string;
  comments?: string;
  state: TaskState;
  videoUrl?: string;
  audioTranscription?: string;
  assignationDate?: Date;
  requiredSendDate?: Date;
  creatorUserId: number;
  revisorUserId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

import { registerEnumType } from '@nestjs/graphql'

export enum TaskState {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  REVIEWED = 'REVIEWED',
}

export class Task {
  private readonly props: TaskProps;

  private constructor(props: TaskProps) {
    this.props = Object.freeze({ ...props });
  }

  get id() { return this.props.id; }
  get title() { return this.props.title; }
  get instruction() { return this.props.instruction; }
  get comments() { return this.props.comments; }
  get state() { return this.props.state; }
  get videoUrl() { return this.props.videoUrl; }
  get audioTranscription() { return this.props.audioTranscription; }
  get assignationDate() { return this.props.assignationDate; }
  get requiredSendDate() { return this.props.requiredSendDate; }
  get creatorUserId() { return this.props.creatorUserId; }
  get revisorUserId() { return this.props.revisorUserId; }
  get createdAt() { return this.props.createdAt; }
  get updatedAt() { return this.props.updatedAt; }

  static create(props: Omit<TaskProps, 'id' | 'createdAt' | 'updatedAt'>): Task {
    return new Task({ ...props });
  }

  update(props: Partial<TaskProps>): Task {
    return new Task({ ...this.props, ...props });
  }

  static reconstitute(props: TaskProps): Task {
    return new Task(props);
  }
}

registerEnumType(TaskState, {
  name: 'TaskState',
  description: 'Enum que representa los posibles estados de una tarea'
})