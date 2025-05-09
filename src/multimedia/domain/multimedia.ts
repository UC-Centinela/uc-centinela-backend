interface MultimediaProps {
  id?: number;
  taskId: number;
  photoUrl?: string;
  videoUrl?: string;
  audioTranscription?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Multimedia {
  private readonly props: MultimediaProps;

  private constructor(props: MultimediaProps) {
    this.props = Object.freeze({ ...props });
  }

  get id() { return this.props.id; }
  get taskId() { return this.props.taskId; }
  get photoUrl() { return this.props.photoUrl; }
  get videoUrl() { return this.props.videoUrl; }
  get audioTranscription() { return this.props.audioTranscription; }
  get createdAt() { return this.props.createdAt; }
  get updatedAt() { return this.props.updatedAt; }

  static create(props: Omit<MultimediaProps, 'id' | 'createdAt' | 'updatedAt'>): Multimedia {
    return new Multimedia({ ...props });
  }

  update(props: Partial<MultimediaProps>): Multimedia {
    return new Multimedia({ ...this.props, ...props });
  }

  static reconstitute(props: MultimediaProps): Multimedia {
    return new Multimedia(props);
  }
}
