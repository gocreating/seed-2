export default (app) => {
  app.use((err, req, res, next) => {
    switch (err.constructor.name) {
      case 'PageNotFound': {
        res.status(err.status);
        res.send('404');
        // remember to break the block.
        // otherwise the err will be passed to next handler
        // and cause unknown error
        break;
      }
      case 'Unauthorize': {
        break;
      }
      default: {
        return next(err);
      }
    }
  });
};