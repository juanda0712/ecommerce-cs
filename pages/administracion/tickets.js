import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useContext, useReducer, useState } from 'react';
import {
  Box,
  Grid,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Button,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import cron from 'cron';

import Layout from '../../components/Layout';
import { Store } from '../../utils/Store';
import { getError } from '../../utils/error';
import classes from '../../utils/classes';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'FINISH_REQUEST':
      return { ...state, loadingFinish: true };
    case 'FINISH_SUCCESS':
      return { ...state, loadingFinish: false, successFinished: true };
    case 'FINISH_FAIL':
      return { ...state, loadingFinish: false };
    case 'FINISH_RESET':
      return { ...state, loadingFinish: false, successFinished: false };
    default:
      state;
  }
}

function Ticket() {
  const { state } = useContext(Store);
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { userInfo } = state;
  const [{ error, orders, loadingFinish, successFinished }, dispatch] =
    useReducer(reducer, {
      loading: true,
      orders: [],
      error: '',
    });
  const [job] = useState(
    new cron.CronJob('*/10 * * * * *', async () => {
      await fetchData();
    })
  );

  useEffect(() => {
    if (!userInfo) {
      router.push('/acceso');
    }
    job.start();
    if (successFinished) {
      dispatch({ type: 'FINISH_RESET' });
    } else {
      fetchData();
    }
  }, [successFinished]);

  const fetchData = async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await axios.get(`/api/admin/tickets`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
    }
  };

  const finishHandler = async (orderId) => {
    closeSnackbar();
    if (!window.confirm('Quiere finalizar la orden?')) {
      return;
    }
    try {
      dispatch({ type: 'FINISH_REQUEST' });
      await axios.put(
        `/api/admin/order`,
        { orderId },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'FINISH_SUCCESS' });
      enqueueSnackbar('Orden finalizada correctamente', {
        variant: 'success',
      });
    } catch (err) {
      dispatch({ type: 'FINISH_FAIL' });
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  return (
    <Layout>
      {loadingFinish && <CircularProgress />}
      {error ? (
        <Typography sx={classes.error}>{error}</Typography>
      ) : (
        <Grid container spacing={1}>
          {orders.map((order) => (
            <Grid item md={4} xs={12} key={order._id}>
              <Box sx={classes.menuPopop3}>
                <List>
                  <ListItem>
                    <Typography>
                      Orden #{order._id.substring(19, 24)}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      <strong>{order.shippingAddress.fullName}</strong>
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Producto</TableCell>
                            <TableCell align="right">Cantidad</TableCell>
                            <TableCell align="right">Precio</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order.orderProducts.map((product) => (
                            <TableRow key={product._id}>
                              <TableCell>
                                <Typography>{product.name}</Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Typography>{product.quantity}</Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Typography>&#162;{product.price}</Typography>
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell>
                              <Typography>Total</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography> </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>&#162;{order.totalPrice}</Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </ListItem>
                  {order.deliveryMethod === 'express' ? (
                    <Box>
                      <ListItem>
                        <Typography>
                          <strong>Método de entraga:</strong> Express
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography>
                          <strong>Direccion:</strong>{' '}
                          {order.shippingAddress.address}
                        </Typography>
                      </ListItem>
                    </Box>
                  ) : (
                    <ListItem>
                      <Typography>
                        <strong>Método de entrega:</strong> Para llevar
                      </Typography>
                    </ListItem>
                  )}
                  <ListItem>
                    <Typography>
                      <strong>Método de pago:</strong> {order.paymentMethod}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      <strong>Comentario:</strong> {order.orderComment.comment}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={() => finishHandler(order._id)}
                      size="small"
                      variant="contained"
                      color="secondary"
                    >
                      Finalizar
                    </Button>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Ticket), { ssr: false });
