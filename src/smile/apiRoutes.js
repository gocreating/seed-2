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
    var request = require('superagent');
    let fromLocale, toLocale;

    models.user
      .findOne({
        where: {
          id: req.body.fromUserId,
        },
        attributes: ['locale'],
      })
      .then(user => {
        fromLocale = user.locale;

        models.user
          .findOne({
            where: {
              id: req.body.toUserId,
            },
            attributes: ['locale'],
          })
          .then(user => {
            toLocale = user.locale;

            request
              .get('https://translate.yandex.net/api/v1.5/tr.json/translate')
              .query({
                key: 'trnsl.1.1.20150821T163702Z.60c40f1d9b7d0117.a136fcf6a49ea0e5e37121b2459249c5b18f8fbf',
                lang: fromLocale + '-' + toLocale,
                text: req.body.text,
              })
              .end(function(err, data) {
                console.log(data.body);
                const translatedText = data.body.text[0];
                models.message
                  .create({
                    text: req.body.text,
                    textTranslate: translatedText,
                    fromUserId: req.body.fromUserId,
                    toUserId: req.body.toUserId,
                  })
                  .then((message) => {
                    res.json(message);
                  });
              });
          });
      });
  });

  app.get('/api/articles', (req, res) => {
    models.article
      .findAll()
      .then((articles) => {
        res.json(articles || []);
      });
  });

  app.get('/api/articles/:articleId(\\d+)', (req, res) => {
    models.article
      .findById(req.params.articleId)
      .then((article) => {
        res.json(article || {});
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