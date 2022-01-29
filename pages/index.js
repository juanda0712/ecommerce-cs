/* eslint-disable @next/next/no-img-element */
import NextLink from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import axios from 'axios';
import { Grid, Typography, Link } from '@mui/material';
import { useSnackbar } from 'notistack';

import Layout from '../components/Layout';
import classes from '../utils/classes';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
import ProductItem from '../components/ProductItem';

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { featuredProducts, promotionProducts } = props;
  const { enqueueSnackbar } = useSnackbar();

  //FUNCTIONS
  const addToShoppingHandler = async (product) => {
    const existProduct = state.shopping.shoppingProducts.find(
      (x) => x._id === product._id
    );
    const quantity = existProduct ? existProduct.quantity + 1 : 1;
    //return the product from the DB
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (!data.isAvailable) {
      enqueueSnackbar('Lo sentimos. El producto está agotado', {
        variant: 'error',
      });
      return;
    }
    dispatch({
      type: 'SHOPPING_ADD_PRODUCT',
      payload: { ...product, quantity },
    });
    router.push('/compras');
  };

  return (
    <Layout>
      <Carousel
        autoPlay
        showThumbs={false}
        infiniteLoop
        emulateTouch
        showArrows={false}
      >
        {featuredProducts.map((product) => (
          <NextLink
            key={product._id}
            href={`/producto/${product.slug}`}
            passHref
          >
            <Link sx={classes.flex}>
              <img src={product.featuredImage} alt={product.name}></img>
            </Link>
          </NextLink>
        ))}
      </Carousel>

      <Typography variant="h2" align="center">
        Promociones
      </Typography>
      <Grid container spacing={4}>
        {promotionProducts.map((product) => (
          <Grid item md={6} key={product.name}>
            <ProductItem
              product={product}
              addToShoppingHandler={addToShoppingHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find({ isFeatured: true })
    .lean()
    .limit(3);
  const promotionProductsDocs = await Product.find({ isPromotion: true })
    .lean()
    .limit(8);
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      promotionProducts: promotionProductsDocs.map(db.convertDocToObj),
    },
  };
}
