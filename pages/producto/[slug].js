import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
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
        <Grid item md={6} xs={12}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              border: '8px solid #ff5733',
              borderRadius: 8,
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              responsive
              width={600}
              height={600}
            ></Image>
          </Box>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box sx={classes.menuPopop2}>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                sx={{ width: 85 }}
                component="img"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography
                  component="h1"
                  variant="h1"
                  sx={classes.productsMenu}
                >
                  {product.name}
                </Typography>
              </CardContent>
            </Card>
            <Box>
              <Typography sx={classes.productBoxTitles}>Descripción</Typography>
              <Typography sx={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>
                *{product.description}
              </Typography>
            </Box>
            <Box justifyContent="center" alignItems="center">
              <Typography sx={classes.productBoxTitles}>Cantidad</Typography>
              <ButtonGroup sx={{ marginTop: '0.5rem', marginLeft: '7rem' }}>
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
            <Box m={3} pt={4}>
              <Card>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography sx={classes.shoppingFont}>
                          Precio
                        </Typography>
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
                      onClick={addToShoppingHandler}
                      fullWidth
                      type="submit"
                      sx={{ borderRadius: 35 }}
                      variant="contained"
                      color="primary"
                    >
                      Agregar a la compra
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Box>
          </Box>
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
