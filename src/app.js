import express            from 'express';
import environmentHandler from './core/handlers/environmentHandler';
// import databaseHandler    from './core/handlers/databaseHandler';
import helpersHandler      from './core/handlers/helpersHandler';
import routesHandler      from './core/handlers/routesHandler';
// import errorHandler       from './core/handlers/errorHandler';
import serverHandler      from './core/handlers/serverHandler';

const app = express();

// setup environment
environmentHandler(app);

// setup database connection and models
// databaseHandler(app);

// register helpers
helpersHandler(app);

// setup routing
routesHandler(app);

// error handling
// errorHandler(app);

// launch the server
serverHandler(app);

// exports the app for testing
export default app;