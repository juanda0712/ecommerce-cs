import nc from 'next-connect';
import Order from '../../../models/Order';
import db from '../../../utils/db';
import { onError } from '../../../utils/error';

const handler = nc({
  onError,
});

handler.post(async (req, res) => {
  await db.connect();
  const newOrder = new Order({
    ...req.body,
  });
  await newOrder.save();
  await db.disconnect();
  res.status(201).send({ message: 'Order created succesfully' });
});

export default handler;
