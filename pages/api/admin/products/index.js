import nc from 'next-connect';
import { isAdmin, isAuth } from '../../../../utils/auth';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

handler.post(async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    name: 'nombre del producto',
    slug: 'nombre-url-' + Math.random(),
    category: 'categoria',
    image: 'images/nombreImagen',
    price: 0,
    description: 'Descripcion del producto',
    featuredImage: 'images/nombreImagen',
    isAvailable: true,
    isFeatured: false,
    isPromotion: false,
    isCombo: false,
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({
    message: 'Producto creado - modifique la informacion y cargue las imagenes',
    product,
  });
});

export default handler;
