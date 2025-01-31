export class AuthorizationError extends Error {
  constructor(message : string) {
    super(message);
    this.name = 'AuthorizationError';
    Error.captureStackTrace(this, AuthorizationError);
  }
}

export class AuthenticationError extends Error {
  constructor(message : string) {
    super(message);
    this.name = 'AuthenticationError';
    Error.captureStackTrace(this, AuthenticationError);
  }
}
