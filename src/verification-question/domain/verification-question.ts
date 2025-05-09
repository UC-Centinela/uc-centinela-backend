interface VerificationQuestionProps {
  id?: number;
  criticActivityId: number;
  title: string;
  description?: string;
}

export class VerificationQuestion {
  private readonly props: VerificationQuestionProps;

  private constructor(props: VerificationQuestionProps) {
    this.props = Object.freeze({ ...props });
  }

  get id() { return this.props.id; }
  get criticActivityId() { return this.props.criticActivityId; }
  get title() { return this.props.title; }
  get description() { return this.props.description; }

  static create(props: Omit<VerificationQuestionProps, 'id'>): VerificationQuestion {
    return new VerificationQuestion(props);
  }

  update(props: Partial<VerificationQuestionProps>): VerificationQuestion {
    return new VerificationQuestion({ ...this.props, ...props });
  }

  static reconstitute(props: VerificationQuestionProps): VerificationQuestion {
    return new VerificationQuestion(props);
  }
}
