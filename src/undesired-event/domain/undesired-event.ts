interface UndesiredEventProps {
  id?: number;
  criticActivityId: number;
  title: string;
  description?: string;
}

export class UndesiredEvent {
  private readonly props: UndesiredEventProps

  private constructor (props: UndesiredEventProps) {
    this.props = Object.freeze({ ...props })
  }

  get id () { return this.props.id }

  get criticActivityId () { return this.props.criticActivityId }

  get title () { return this.props.title }

  get description () { return this.props.description }

  static create (props: Omit<UndesiredEventProps, 'id'>): UndesiredEvent {
    return new UndesiredEvent(props)
  }

  update (props: Partial<UndesiredEventProps>): UndesiredEvent {
    return new UndesiredEvent({ ...this.props, ...props })
  }

  static reconstitute (props: UndesiredEventProps): UndesiredEvent {
    return new UndesiredEvent(props)
  }
}
