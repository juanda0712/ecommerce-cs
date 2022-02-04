import { useRouter } from 'next/router';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Modal,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';

import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import classes from '../utils/classes';
import { getError } from '../utils/error';

function ComprasScreen() {
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { state, dispatch } = useContext(Store);
  const [open, setOpen] = useState(false);
  const {
    shopping: { shoppingProducts },
  } = state;

  //FUNCTIONS
  const removeItemHandler = (item) => {
    dispatch({ type: 'SHOPPING_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    setOpen(true);
  };

  const deliveryHandler = (e, method) => {
    closeSnackbar();
    e.preventDefault();
    try {
      dispatch({ type: 'SAVE_DELIVERY_METHOD', payload: method });
      Cookies.set('deliveryMethod', method);
      router.push('/informacion');
    } catch (error) {
      enqueueSnackbar(getError(error), { variant: 'error' });
    }
  };

  const closeModalHandler = () => {
    setOpen(false);
  };

  return (
    <Layout title="Compras">
      <Typography component="h1" variant="h1">
        Compras
      </Typography>
      {shoppingProducts.length === 0 ? (
        <Box>
          No hay compras.{' '}
          <NextLink href="/menu" passHref>
            <Link>Ir al menu</Link>
          </NextLink>
        </Box>
      ) : (
        <Box>
          <Grid container>
            <Grid item md={9} xs={12}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography sx={classes.tableHead}>Producto</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={classes.tableHead}>Nombre</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={classes.tableHead}>Cantidad</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={classes.tableHead}>Precio</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={classes.tableHead}>Desechar</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {shoppingProducts.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell sx={classes.tableBody}>
                          <NextLink href={`/producto/${item.slug}`} passHref>
                            <Link>
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={65}
                                height={65}
                              ></Image>
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell sx={classes.tableBody}>
                          <NextLink href={`/producto/${item.slug}`} passHref>
                            <Link>
                              <Typography sx={classes.tableBody}>
                                {item.name}
                              </Typography>
                            </Link>
                          </NextLink>
                        </TableCell>
                        <TableCell sx={classes.tableBody}>
                          <Typography>{item.quantity}</Typography>
                        </TableCell>
                        <TableCell sx={classes.tableBody}>
                          &#162;{item.price}
                        </TableCell>
                        <TableCell sx={classes.tableBody}>
                          <IconButton onClick={() => removeItemHandler(item)}>
                            <ClearIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Typography variant="h2">
                      Subtotal (
                      {shoppingProducts.reduce((a, c) => a + c.quantity, 0)}{' '}
                      productos) : &#162;
                      {shoppingProducts.reduce(
                        (a, c) => a + c.quantity * c.price,
                        0
                      )}
                    </Typography>
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={checkoutHandler}
                      fullWidth
                      sx={{ borderRadius: 35 }}
                      variant="contained"
                      color="primary"
                    >
                      Realizar pedido
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      fullWidth
                      type="button"
                      variant="contained"
                      color="secondary"
                      onClick={() => router.push('/menu')}
                      sx={classes.buttonBack}
                    >
                      Seguir comprando
                    </Button>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
          <Modal open={open} onClose={closeModalHandler}>
            <Box sx={classes.menuPopop}>
              <Button onClick={closeModalHandler} sx={classes.closePopop}>
                &times;
              </Button>
              <Typography sx={classes.modalFont}>
                ¿C&Oacute;MO VAS A ESCOGER TU ORDEN?
              </Typography>
              <Card
                style={{ backgroundColor: '#ff5733' }}
                sx={{ marginBottom: '1rem' }}
              >
                <CardActionArea
                  sx={classes.modalCardAction}
                  onClick={(e) => deliveryHandler(e, 'express')}
                >
                  <CardMedia
                    sx={classes.modalCardMedia}
                    component="img"
                    image="/images/delivery.png"
                    alt="Express"
                  />
                  <CardContent sx={classes.modalCard}>
                    <Typography sx={classes.modalFont}>EXPRESS</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Card>
                <CardActionArea
                  sx={classes.modalCardAction}
                  onClick={(e) => deliveryHandler(e, 'carry_out')}
                >
                  <CardMedia
                    sx={classes.modalCardMedia}
                    component="img"
                    image="/images/paraLlevar.png"
                    alt="Para llevar"
                  />
                  <CardContent sx={classes.modalCard}>
                    <Typography sx={classes.modalFont2}>PARA LLEVAR</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Modal>
        </Box>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(ComprasScreen), { ssr: false });
