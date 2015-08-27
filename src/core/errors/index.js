class PageNotFound extends Error {
  constructor(title, detail) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = 404;
    this.title = title || 'Page not found';
    this.detail = detail || 'The url you are requesting does not exist';
  }
};

class Unauthorize extends Error {
  constructor(title, detail) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = 401;
    this.title = title || 'Unauthorized';
    this.detail = detail || 'the user is not authorized';
  }
};

export default {
  PageNotFound: PageNotFound,
  Unauthorize: Unauthorize,
};