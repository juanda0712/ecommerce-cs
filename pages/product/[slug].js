import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import Image from 'next/image';

import db from '../../utils/db';
import Product from '../../models/Product';
import { Store } from '../../utils/Store';
import Layout from '../../components/Layout';
import classes from '../../utils/classes';

export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [productQuantity, setProductQuantity] = useState(1);

  if (!product) {
    return <Box>Product Not Found</Box>;
  }

  //Functions
  const addToShoppingHandler = async () => {
    const existItem = state.shopping.shoppingProducts.find(
      (x) => x._id === product._id
    );
    const quantity = existItem
      ? existItem.quantity + productQuantity
      : productQuantity;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (!data.isAvailable) {
      enqueueSnackbar('Lo sentimos. El producto está agotado', {
        variant: 'error',
      });
      router.push('/menu');
    }
    dispatch({
      type: 'SHOPPING_ADD_PRODUCT',
      payload: { ...product, quantity },
    });
    router.push('/compras');
  };

  const incProductQuantityHandler = () => {
    setProductQuantity(productQuantity + 1);
  };
  const decProductQuantityHandler = () => {
    if (productQuantity > 1) setProductQuantity(productQuantity - 1);
    else {
      setProductQuantity(1);
    }
  };

  return (
    <Layout title={product.name}>
      <Grid container spacing={1}>
        <Grid item md={5} xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Image
              src={product.image}
              alt={product.name}
              responsive
              width={500}
              height={500}
            ></Image>
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box justifyContent="center" alignItems="center">
            <Typography component="h1" variant="h1" sx={classes.productsMenu}>
              {product.name}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="10vh"
          >
            <Typography component="h2" variant="h2" sx={classes.menuTitles}>
              Cantidad:
            </Typography>
            <ButtonGroup variant="outlined">
              <Box>
                <Button
                  sx={classes.productGroupButtons}
                  onClick={decProductQuantityHandler}
                >
                  <RemoveIcon />
                </Button>
              </Box>
              <Button disabled sx={classes.productGroupButtons}>
                <Typography sx={classes.shoppingFont}>
                  {productQuantity}
                </Typography>
              </Button>
              <Box>
                <Button
                  sx={classes.productGroupButtons}
                  onClick={incProductQuantityHandler}
                >
                  <AddIcon />
                </Button>
              </Box>
            </ButtonGroup>
          </Box>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography sx={classes.shoppingFont}>Precio</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={classes.shoppingFont} align="right">
                      &#162;{product.price * productQuantity}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  onClick={addToShoppingHandler}
                  sx={classes.buttonCheckout}
                >
                  Agregar a la compra
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
