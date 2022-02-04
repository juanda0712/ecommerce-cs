import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useEffect, useContext, useReducer } from 'react';
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';
import Layout from '../../components/Layout';
import classes from '../../utils/classes';
import { useSnackbar } from 'notistack';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        zones: action.payload,
        error: '',
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreate: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true };
    case 'DELETE_SUCCESS':
      return { ...state, loadingDelete: false, successDelete: true };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false };
    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      state;
  }
}

function AdminZones() {
  const { state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;
  const { enqueueSnackbar } = useSnackbar();
  const [{ loading, error, zones, successDelete, loadingDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      categories: [],
      error: '',
    });

  useEffect(() => {
    if (!userInfo) {
      router.push('/acceso');
    }
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/zones`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [successDelete]);

  const createHandler = async () => {
    if (!window.confirm('Quiere crear una zona?')) {
      return;
    }
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await axios.post(
        `/api/admin/zones`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'CREATE_SUCCESS' });
      enqueueSnackbar(data.message, { variant: 'success' });
      router.push(`/administracion/zona/${data.zone._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const deleteHandler = async (zoneId) => {
    if (!window.confirm('Quiere eliminar la zona?')) {
      return;
    }
    try {
      dispatch({ type: 'DELETE_REQUEST' });
      await axios.delete(`/api/admin/zones/${zoneId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: 'DELETE_SUCCESS' });
      enqueueSnackbar('Zona eliminada correctamente', {
        variant: 'success',
      });
    } catch (err) {
      dispatch({ type: 'DELETE_FAIL' });
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  return (
    <Layout title="Zonas">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card sx={classes.section}>
            <List>
              <NextLink href="/administracion/panel" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Panel de Administracion"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/administracion/ordenes" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Ordenes"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/administracion/productos" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Productos"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/administracion/usuarios" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Usuarios"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/administracion/categorias" passHref>
                <ListItem button component="a">
                  <ListItemText primary="Categorias"></ListItemText>
                </ListItem>
              </NextLink>
              <NextLink href="/administracion/zonas" passHref>
                <ListItem selected button component="a">
                  <ListItemText primary="Zonas"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card sx={classes.section}>
            <List>
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <Typography component="h1" variant="h1">
                    Zonas
                  </Typography>
                  {loadingDelete && <CircularProgress />}
                </Grid>
                <Grid align="right" item xs={6}>
                  <Button
                    onClick={createHandler}
                    color="primary"
                    variant="contained"
                  >
                    Crear
                  </Button>
                </Grid>
              </Grid>
              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography sx={classes.error}>{error}</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>ZONA</TableCell>
                          <TableCell>DISTRITO</TableCell>
                          <TableCell>PRECIO</TableCell>
                          <TableCell>ACCIONES</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {zones.map((zone) => (
                          <TableRow key={zone._id}>
                            <TableCell>{zone._id.substring(20, 24)}</TableCell>
                            <TableCell>{zone.zone}</TableCell>
                            <TableCell>{zone.district}</TableCell>
                            <TableCell>{zone.price}</TableCell>
                            <TableCell>
                              <NextLink
                                href={`/administracion/zona/${zone._id}`}
                                passHref
                              >
                                <Button
                                  size="small"
                                  variant="contained"
                                  color="secondary"
                                >
                                  Editar
                                </Button>
                              </NextLink>{' '}
                              <Button
                                onClick={() => deleteHandler(zone._id)}
                                size="small"
                                variant="contained"
                                color="error"
                              >
                                Eliminar
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AdminZones), { ssr: false });
