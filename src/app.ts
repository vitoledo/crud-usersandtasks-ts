import express from 'express';
import type { Express } from 'express';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

const app: Express = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);

export default app;
