export default (app, models) => {
  app.get('/api/users/:userId/name', (req, res) => {
    models.user
      .findOne({
        where: {
          id: req.params.userId,
        },
        attributes: ['name'],
      })
      .then(user => {
        res.json(user.name);
      });
  });

  app.get('/api/messages', (req, res) => {
    models.message
      .findAll({
        where: {
          $or: [
            {
              fromUserId: req.query.fromUserId,
              toUserId: req.query.toUserId,
            },
            {
              fromUserId: req.query.toUserId,
              toUserId: req.query.fromUserId,
            },
          ],
        },
      })
      .then((messages) => {
        res.json(messages || []);
      });
  });

  app.post('/api/messages', (req, res) => {
    models.message
      .create({
        text: req.body.text,
        fromUserId: req.body.fromUserId,
        toUserId: req.body.toUserId,
      })
      .then((message) => {
        res.json(message);
      });
  });
}