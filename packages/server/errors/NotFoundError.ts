export class NotFoundError extends Error {
  public name = 'NotFoundError';

  constructor(message: string) {
    super(message);
  }
}
