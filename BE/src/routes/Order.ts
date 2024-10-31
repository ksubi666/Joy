import { Router } from 'express';
import { getOrders, orderCreate } from '../controller/order';
const order = Router();

order.post('/create', orderCreate as any).get('/getOrders', getOrders as any);

export { order };
