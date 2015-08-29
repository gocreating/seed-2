export default (app) => {
  /**
   * Register `rest` function
   *
   * @param {string} path
   * @param {string} pathIdentifier
   * @param {object} model
   * @param {object} modelAttribute
   *
   * Usage:
   *   app.rest('/api/users', ':id(\\d+)', models.User, 'id');
   */
  app.rest = (path, pathIdentifier, model, modelAttribute) => {
    // index
    app.get(path, (req, res) => {
      model
        .findAll()
        .then(resources => {
          res.json(resources);
        });
    });

    // create
    app.post(path, (req, res) => {
      model
        .build(req.body)
        .save()
        .then(resource => {
          res.json(resource);
        })
        .catch(err => {
          res.json(err);
        });
    });

    // read
    app.get(`${path}/${pathIdentifier}`, (req, res) => {
      const condition = {};
      condition[modelAttribute] = req.params.id;

      model
        .find({
          where: condition,
        })
        .then(resource => {
          res.json(resource);
        });
    });

    // update
    app.put(`${path}/${pathIdentifier}`, (req, res) => {
      const condition = {};
      condition[modelAttribute] = req.params.id;

      model
        .find({
          where: condition,
        })
        .then(resource => {
          resource
            .updateAttributes(req.body)
            .then(updatedUser => {
              res.json(updatedUser);
            });
        });
    });

    // delete
    app.delete(`${path}/${pathIdentifier}`, (req, res) => {
      const condition = {};
      condition[modelAttribute] = req.params.id;

      model
        .find({
          where: condition,
        })
        .then(resource => {
          if (resource) {
            resource.destroy().then(() => {
              res.json(resource);
            });
          } else {
            res.json(null);
          }
        });
    });
  };
};