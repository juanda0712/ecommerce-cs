import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../../utils/auth';
import Product from '../../../../../models/Product';
import db from '../../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});

handler.put(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    product.name = req.body.name;
    product.slug = req.body.slug;
    product.category = req.body.category;
    product.image = req.body.image;
    product.price = req.body.price;
    product.description = req.body.description;
    product.featuredImage = req.body.featuredImage;
    product.isAvailable = req.body.isAvailable;
    product.isFeatured = req.body.isFeatured;
    product.isPromotion = req.body.isPromotion;
    product.isCombo = req.body.isCombo;
    await product.save();
    await db.disconnect();
    res.send({ message: 'Producto actualizado correctamente' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'No se encontro el producto' });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    await product.remove();
    await db.disconnect();
    res.send({ message: 'Producto Eliminado' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Producto no encontrado' });
  }
});

export default handler;
