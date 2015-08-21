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

  app.get('/api/articles', (req, res) => {
    models.article
      .findAll()
      .then((articles) => {
        res.json(articles || []);
      });
  });

  app.post('/api/articles', (req, res) => {
    models.article
      .create({
        title: req.body.title,
        content: req.body.content,
        authorUserId: req.body.authorUserId,
      })
      .then((article) => {
        res.json(article);
      });
  });
}