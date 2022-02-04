import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Image from 'next/image';
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  CircularProgress,
  Button,
  Card,
  List,
  ListItem,
} from '@mui/material';

import classes from '../utils/classes';
import Layout from '../components/Layout';
import CheckoutWizard from '../components/CheckoutWizard';
import Purchase from '../components/popop/Purchase';
import InfoSINPE from '../components/popop/InfoSINPE';
import { getError } from '../utils/error';
import db from '../utils/db';
import { Store } from '../utils/Store';
import Zone from '../models/Zone';

function Pedido(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [open, setOpen] = useState(false);
  const [openSINPE, setOpenSINPE] = useState(false);
  const { zones } = props;
  const {
    shopping: {
      shoppingProducts,
      shippingAddress,
      paymentMethod,
      deliveryMethod,
    },
  } = state;
  const itemsPrice = shoppingProducts.reduce(
    (a, c) => a + c.price * c.quantity,
    0
  );
  const zone = zones.find((zone) => zone.zone === shippingAddress.zone);
  const shippingPrice = deliveryMethod === 'carry_out' ? 0 : zone.price;
  const taxPrice = itemsPrice * 0.13;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!paymentMethod) {
      router.push('/pago');
    }
    if (shoppingProducts.length === 0) {
      router.push('/compras');
    }
  }, []);

  //FUNCTIONS
  const placeOrderHandler = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      await axios.post('/api/orders', {
        orderProducts: shoppingProducts,
        shippingAddress,
        paymentMethod,
        deliveryMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      dispatch({ type: 'SHOPPING_CLEAR' });
      Cookies.remove('shoppingProducts');
      setLoading(false);
      setOpen(true);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const openSINPEHandler = () => {
    setOpenSINPE(true);
  };
  const SINPEHandler = () => {
    setOpenSINPE(false);
    placeOrderHandler();
  };
  const closeModalHandler = () => {
    setOpen(false);
    router.push(`/`);
  };
  const closeSINPEModalHandler = () => {
    setOpenSINPE(false);
  };

  return (
    <Layout title="Pedido">
      <CheckoutWizard activeStep={2}></CheckoutWizard>
      <Purchase open={open} closeModalHandler={closeModalHandler} />
      <InfoSINPE
        openSINPE={openSINPE}
        closeSINPEModalHandler={closeSINPEModalHandler}
        SINPEHandler={SINPEHandler}
        totalPrice={totalPrice}
      />
      <Typography component="h1" variant="h1">
        Resumen del Pedido
      </Typography>
      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Información
                </Typography>
              </ListItem>
              {deliveryMethod === 'carry_out' ? (
                <ListItem>
                  {shippingAddress.fullName}, {shippingAddress.phoneNumber}
                </ListItem>
              ) : (
                <ListItem>
                  {shippingAddress.fullName}, {shippingAddress.address},{' '}
                  {shippingAddress.phoneNumber}, {shippingAddress.district},{' '}
                  {shippingAddress.zone}
                </ListItem>
              )}
            </List>
          </Card>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Método de Pago
                </Typography>
              </ListItem>
              <ListItem>{paymentMethod}</ListItem>
            </List>
          </Card>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Método de Entrega
                </Typography>
              </ListItem>
              {deliveryMethod === 'express' ? (
                <ListItem>Express</ListItem>
              ) : (
                <ListItem>Para Llevar</ListItem>
              )}
            </List>
          </Card>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Productos Seleccionados
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Producto</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Cantidad</TableCell>
                        <TableCell align="right">Precio</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {shoppingProducts.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/producto/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                ></Image>
                              </Link>
                            </NextLink>
                          </TableCell>

                          <TableCell>
                            <NextLink href={`/producto/${item.slug}`} passHref>
                              <Link>
                                <Typography>{item.name}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{item.quantity}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>${item.price}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                <Typography variant="h2">Resumen del pedido</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Productos:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">&#162;{itemsPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>IVA:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">&#162;{taxPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>transporte:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">&#162;{shippingPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Total:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <strong>&#162;{totalPrice}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={
                    paymentMethod === 'SINPE'
                      ? openSINPEHandler
                      : placeOrderHandler
                  }
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Realizar Pedido
                </Button>
              </ListItem>
              {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Pedido), { ssr: false });

export async function getServerSideProps() {
  await db.connect();
  const zonesDocs = await Zone.find({}).lean();
  await db.disconnect();
  return {
    props: {
      zones: zonesDocs.map(db.convertDocToObj),
    },
  };
}
