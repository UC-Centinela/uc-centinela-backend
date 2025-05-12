interface ControlProps {
  id?: number;
  criticActivityId: number;
  title: string;
  description?: string;
}

export class Control {
  private readonly props: ControlProps

  private constructor (props: ControlProps) {
    this.props = Object.freeze({ ...props })
  }

  get id () { return this.props.id }

  get criticActivityId () { return this.props.criticActivityId }

  get title () { return this.props.title }

  get description () { return this.props.description }

  static create (props: Omit<ControlProps, 'id'>): Control {
    return new Control(props)
  }

  update (props: Partial<ControlProps>): Control {
    return new Control({ ...this.props, ...props })
  }

  static reconstitute (props: ControlProps): Control {
    return new Control(props)
  }
}
