class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: unknown, statusCode = 400) {
    if (statusCode === 500) {
      message = 'Internal server error';
    }

    this.message = String(message);
    this.statusCode = statusCode;
  }
}

export default AppError;
