export default class UnauthorizedError extends Error {
  public code: number;

  constructor(message: string) {
    super(message);
    this.name = 'InvalidToken';
    this.code = 401;
  }
}
