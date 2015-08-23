export default (app, models) => {
  app.rest('/api/users', ':id(\\d+)', models.User, 'id');
}