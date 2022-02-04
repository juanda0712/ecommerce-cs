import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Category from '../../../../models/Category';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const categories = await Category.find({});
  await db.disconnect();
  res.send(categories);
});

handler.post(async (req, res) => {
  await db.connect();
  const newCategory = new Category({
    name: 'nombre de la categoria',
    identifier: 'identificador',
    image: 'cargar imagen',
  });

  const category = await newCategory.save();
  await db.disconnect();
  res.send({
    message: 'Categoria creada - modifique la informacion',
    category,
  });
});

export default handler;
