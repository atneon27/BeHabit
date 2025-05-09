import express from 'express';
import authRouter from './routes/authRoute.js';

const app = express();

app.use('/api/auth', authRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});