import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Zone from '../../../../models/Zone';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const zones = await Zone.find({});
  await db.disconnect();
  res.send(zones);
});

handler.post(async (req, res) => {
  await db.connect();
  const newZone = new Zone({
    zone: 'nombre de la zona',
    district: 'nombre del distrito',
    price: 0,
  });

  const zone = await newZone.save();
  await db.disconnect();
  res.send({
    message: 'Zona creada - modifique la informacion',
    zone,
  });
});

export default handler;
