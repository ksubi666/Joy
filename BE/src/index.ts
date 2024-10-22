import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { user } from './routes/User';
import { Connect } from './Utills/db';
import { category } from './routes/Category';
import { auth } from './routes/Auth';
import { product } from './routes/Product';

dotenv.config();

const app = express();

const PORT: string | undefined = process.env.PORT;

app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);

app.use('/user', user);
app.use('/category', category);

app.use('/auth', auth);
app.use('/product', product);

app.listen(PORT, () => {
  Connect(process.env.MONGODB_CONNECTION_STRING);
  console.log('listening port', PORT);
});
