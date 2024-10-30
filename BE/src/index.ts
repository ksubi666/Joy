import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { user } from './routes/User';
import { Connect } from './Utills/db';
import { category } from './routes/Category';
import { auth } from './routes/Auth';
import { product } from './routes/Product';
import { review } from './routes/Review';
import { cart } from './routes/Cart';
import { wishlist } from './routes/Wishlist';

dotenv.config();

const app = express();

const PORT: string | undefined = process.env.PORT;

app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: 'https://joy-omega.vercel.app',
  })
);

app.use('/user', user);
app.use('/category', category);

app.use('/auth', auth);
app.use('/product', product);
app.use('/review', review);
app.use('/cart', cart);
app.use('/wishlist', wishlist);

app.listen(PORT, () => {
  Connect(process.env.MONGODB_CONNECTION_STRING);
  console.log('listening port', PORT);
});
