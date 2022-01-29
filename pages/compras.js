import { useRouter } from 'next/router';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { useContext } from 'react';
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
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import classes from '../utils/classes';

function ComprasScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    shopping: { shoppingProducts },
  } = state;

  //FUNCTIONS
  const removeItemHandler = (item) => {
    dispatch({ type: 'SHOPPING_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    router.push('/shipping');
  };

  return (
    <Layout title="Compras">
      <Typography component="h1" variant="h1">
        Compras
      </Typography>
      {shoppingProducts.length === 0 ? (
        <Box>
          No hay compras.{' '}
          <NextLink href="/" passHref>
            <Link>Ir al menu</Link>
          </NextLink>
        </Box>
      ) : (
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
                    sx={classes.buttonCheckout}
                  >
                    Pagar
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(ComprasScreen), { ssr: false });
