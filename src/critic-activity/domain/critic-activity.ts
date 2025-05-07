interface CriticActivityProps {
    id?: number;
    title: string;
    taskId: number;
  }
  
  export class CriticActivity {
    private readonly props: CriticActivityProps;
  
    private constructor(props: CriticActivityProps) {
      this.props = Object.freeze({ ...props });
    }
  
    get id() {
      return this.props.id;
    }
  
    get title() {
      return this.props.title;
    }
  
    get taskId() {
      return this.props.taskId;
    }
  
    static create(props: Omit<CriticActivityProps, 'id'>): CriticActivity {
      return new CriticActivity(props);
    }
  
    update(props: Partial<CriticActivityProps>): CriticActivity {
      return new CriticActivity({ ...this.props, ...props });
    }
  
    static reconstitute(props: CriticActivityProps): CriticActivity {
      return new CriticActivity(props);
    }
  }
  