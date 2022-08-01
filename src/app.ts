import express, { json } from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import carRoute from './routes/carRoute';

const app = express();
app.use(json());
app.use(carRoute);

app.use(errorHandler);

export default app;
