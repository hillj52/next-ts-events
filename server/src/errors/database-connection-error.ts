import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  public reason = 'Error connecting to database';

  public statusCode = 500;

  constructor() {
    super('Error connecting to database');

    // Only needed when extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
