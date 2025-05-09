interface ControlStrategyProps {
  id?: number;
  taskId: number;
  title: string;
}

export class ControlStrategy {
  private readonly props: ControlStrategyProps;

  private constructor(props: ControlStrategyProps) {
    this.props = Object.freeze({ ...props });
  }

  get id() { return this.props.id; }
  get taskId() { return this.props.taskId; }
  get title() { return this.props.title; }

  static create(props: Omit<ControlStrategyProps, 'id'>): ControlStrategy {
    return new ControlStrategy(props);
  }

  update(props: Partial<ControlStrategyProps>): ControlStrategy {
    return new ControlStrategy({ ...this.props, ...props });
  }

  static reconstitute(props: ControlStrategyProps): ControlStrategy {
    return new ControlStrategy(props);
  }
}
