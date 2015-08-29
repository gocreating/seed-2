export default (app, models) => {
  app.rest('/api/todos', ':id(\\d+)', models.Todo, 'id');
};