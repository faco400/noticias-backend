import express from 'express';
import cors from 'cors';
import noticiasRoutes from './routes/noticias.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/noticias', noticiasRoutes);

export default app;
