import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import Zone from '../../../../../models/Zone';
import db from '../../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const zone = await Zone.findById(req.query.id);
  await db.disconnect();
  res.send(zone);
});

handler.put(async (req, res) => {
  await db.connect();
  const zone = await Zone.findById(req.query.id);
  if (zone) {
    zone.zone = req.body.zone;
    zone.district = req.body.district;
    zone.price = req.body.price;
    await zone.save();
    await db.disconnect();
    res.send({ message: 'Zone Updated Successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Zone Not Found' });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const zone = await Zone.findById(req.query.id);
  if (zone) {
    await zone.remove();
    await db.disconnect();
    res.send({ message: 'Zone Deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Zone Not Found' });
  }
});

export default handler;
