class TokenExpiration extends Error {
  constructor(title, detail) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = 401;
    this.title = title || 'Token expired';
    this.detail = detail || 'The bearer token has expired';
  }
};

class TokenInvalid extends Error {
  constructor(title, detail) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = 400;
    this.title = title || 'Invalid token';
    this.detail = detail || 'This token is malformed';
  }
};

export default {
  TokenExpiration: TokenExpiration,
  TokenInvalid: TokenInvalid,
};