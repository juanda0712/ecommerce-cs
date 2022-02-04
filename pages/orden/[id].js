import React, { useContext, useEffect, useReducer } from 'react';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
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
  Card,
  List,
  ListItem,
} from '@mui/material';

import classes from '../../utils/classes';
import Layout from '../../components/Layout';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function Pedido({ params }) {
  const orderId = params.id;
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });

  const {
    orderProducts,
    shippingAddress,
    paymentMethod,
    deliveryMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    createdAt,
  } = order;

  useEffect(() => {
    if (!userInfo) {
      return router.push('/acceso');
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchOrder();
  }, []);

  return (
    <Layout title={`Pedido ${orderId}`}>
      <Typography component="h1" variant="h1">
        Pedido {orderId}
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
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography sx={classes.error}>{error}</Typography>
              ) : deliveryMethod === 'carry_out' ? (
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
                  Fecha y hora
                </Typography>
              </ListItem>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography sx={classes.error}>{error}</Typography>
              ) : (
                <>
                  <ListItem>
                    {createdAt.substring(8, 10)}-{createdAt.substring(5, 7)}-
                    {createdAt.substring(0, 4)}
                  </ListItem>
                  <ListItem>{createdAt.substring(11, 16)}</ListItem>
                </>
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
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography sx={classes.error}>{error}</Typography>
              ) : (
                <ListItem>{paymentMethod}</ListItem>
              )}
            </List>
          </Card>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Método de Entrega
                </Typography>
              </ListItem>
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography sx={classes.error}>{error}</Typography>
              ) : deliveryMethod === 'express' ? (
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
                    {loading ? (
                      <CircularProgress />
                    ) : error ? (
                      <Typography sx={classes.error}>{error}</Typography>
                    ) : (
                      <TableBody>
                        {orderProducts.map((product) => (
                          <TableRow key={product._id}>
                            <TableCell>
                              <NextLink
                                href={`/producto/${product.slug}`}
                                passHref
                              >
                                <Link>
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={50}
                                    height={50}
                                  ></Image>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell>
                              <NextLink
                                href={`/producto/${product.slug}`}
                                passHref
                              >
                                <Link>
                                  <Typography>{product.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>{product.quantity}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>${product.price}</Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    )}
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
              {loading ? (
                <CircularProgress />
              ) : error ? (
                <Typography sx={classes.error}>{error}</Typography>
              ) : (
                <>
                  <ListItem>
                    <Grid container>
                      <Grid item xs={6}>
                        <Typography>Productos:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography align="right">
                          &#162;{itemsPrice}
                        </Typography>
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
                        <Typography align="right">
                          &#162;{shippingPrice}
                        </Typography>
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
                </>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Pedido), { ssr: false });

export async function getServerSideProps({ params }) {
  return { props: { params } };
}
