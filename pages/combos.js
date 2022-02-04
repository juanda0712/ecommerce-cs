/* eslint-disable @next/next/no-img-element */
import { Grid, Typography } from '@mui/material';

import Layout from '../components/Layout';
import Product from '../models/Product';
import db from '../utils/db';
import ProductItem from '../components/ProductItem';

export default function Home(props) {
  const { comboProducts } = props;

  return (
    <Layout>
      <Typography variant="h1" align="center">
        Combos
      </Typography>
      <Grid container spacing={4}>
        {comboProducts.map((product) => (
          <Grid item md={6} key={product.name}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const comboProductsDocs = await Product.find({
    isCombo: true,
    isAvailable: true,
  }).lean();

  await db.disconnect();
  return {
    props: {
      comboProducts: comboProductsDocs.map(db.convertDocToObj),
    },
  };
}
