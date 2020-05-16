// Application code entry point

import express from 'express';
import cors from 'cors';

import loginRouteHandler from './http/login/login.route';
import registerRouteHandler from './http/register/register.route';

const app = express();

// MiddleWares
app.use(cors());
app.use(express.json());

app.use('/login', loginRouteHandler);
app.use('/register', registerRouteHandler);

export default app;
