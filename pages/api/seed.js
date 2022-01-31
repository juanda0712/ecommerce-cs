import nc from 'next-connect';

import User from '../../models/User';
import Product from '../../models/Product';
import Category from '../../models/Category';
import Zone from '../../models/Zone';
import db from '../../utils/db';
import data from '../../utils/data';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);
  await Category.deleteMany();
  await Category.insertMany(data.categories);
  await Zone.deleteMany();
  await Zone.insertMany(data.zones);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
});

export default handler;
