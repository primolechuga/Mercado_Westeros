export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    Error.captureStackTrace(this, NotFoundError);
  }
}

export class RequiredFieldError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RequiredFieldError';
    Error.captureStackTrace(this, RequiredFieldError);
  }
}

export class InvalidFieldError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidFieldError';
    Error.captureStackTrace(this, InvalidFieldError);
  }
}

export class OutOfRangeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OutOfRangeError';
    Error.captureStackTrace(this, OutOfRangeError);
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    Error.captureStackTrace(this, ValidationError);
  }
}
