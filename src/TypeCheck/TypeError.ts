import { AppError } from '../Error';

class TypeError extends AppError {
  public constructor(
    public readonly data: unknown,
    public readonly messages: string[],
  ) {
    super(messages.join('\n'));
  }
}

export default TypeError;
