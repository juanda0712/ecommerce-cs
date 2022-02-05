/* eslint-disable @next/next/no-img-element */
import { Grid, Typography } from '@mui/material';

import Layout from '../components/Layout';
import Product from '../models/Product';
import db from '../utils/db';
import ProductItem from '../components/ProductItem';

export default function Combos(props) {
  const { comboProducts } = props;

  return (
    <Layout>
      <Typography variant="h1" align="center">
        Combos
      </Typography>
      <Grid container spacing={3}>
        {comboProducts.map((product) => (
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
