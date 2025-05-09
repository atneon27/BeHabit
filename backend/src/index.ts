import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRoute.js';
import habitRouter from './routes/habitRouter.js';
import itemRouter from './routes/itemRouter.js';

const app = express();

app.use(cors());
app.use('/api/auth', authRouter);
app.use('/api/habits', habitRouter);
app.use('/api/items', itemRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});