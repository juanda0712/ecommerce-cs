import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.body.orderId);
  if (order) {
    order.isFinished = true;
    await order.save();
    await db.disconnect();
    res.send({ message: 'Order Finished Successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Order Not Found' });
  }
});

export default handler;
