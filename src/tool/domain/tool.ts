interface ToolProps {
  id?: number;
  criticActivityId: number;
  title: string;
}

export class Tool {
  private readonly props: ToolProps

  private constructor (props: ToolProps) {
    this.props = Object.freeze({ ...props })
  }

  get id () { return this.props.id }

  get criticActivityId () { return this.props.criticActivityId }

  get title () { return this.props.title }

  static create (props: Omit<ToolProps, 'id'>): Tool {
    return new Tool(props)
  }

  update (props: Partial<ToolProps>): Tool {
    return new Tool({ ...this.props, ...props })
  }

  static reconstitute (props: ToolProps): Tool {
    return new Tool(props)
  }
}
