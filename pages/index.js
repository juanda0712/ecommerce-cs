/* eslint-disable @next/next/no-img-element */
import NextLink from 'next/link';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Grid, Typography, Link } from '@mui/material';

import Layout from '../components/Layout';
import classes from '../utils/classes';
import Product from '../models/Product';
import db from '../utils/db';
import ProductItem from '../components/ProductItem';

export default function Home(props) {
  const { featuredProducts, promotionProducts } = props;

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
          <Grid item md={4} key={product.name}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const featuredProductsDocs = await Product.find({
    isFeatured: true,
    isAvailable: true,
  })
    .lean()
    .limit(3);
  const promotionProductsDocs = await Product.find({
    isPromotion: true,
    isAvailable: true,
  })
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
