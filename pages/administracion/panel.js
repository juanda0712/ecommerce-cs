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
  CardContent,
  CardActions,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';
import Layout from '../../components/Layout';
import classes from '../../utils/classes';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, summary: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminPanel() {
  const { state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: '',
  });

  useEffect(() => {
    if (!userInfo) {
      router.push('/acceso');
    }
    const fetchData = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/admin/summary`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  return (
    <Layout title="Administracion">
      <Grid container spacing={1}>
        <Grid item md={3} xs={12}>
          <Card sx={classes.section}>
            <List>
              <NextLink href="/administracion/panel" passHref>
                <ListItem selected button component="a">
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
                <ListItem button component="a">
                  <ListItemText primary="Zonas"></ListItemText>
                </ListItem>
              </NextLink>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card sx={classes.section}>
            <List>
              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography sx={classes.error}>{error}</Typography>
                ) : (
                  <Grid container spacing={5}>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            ${summary.ordersPrice}
                          </Typography>
                          <Typography>Ventas</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink href="/administracion/ordenes" passHref>
                            <Button size="small" color="primary">
                              Ver ventas
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            {summary.ordersCount}
                          </Typography>
                          <Typography>Ordenes</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink href="/administracion/ordenes" passHref>
                            <Button size="small" color="primary">
                              Ver ordenes
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            {summary.productsCount}
                          </Typography>
                          <Typography>Productos</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink href="/administracion/productos" passHref>
                            <Button size="small" color="primary">
                              Ver productos
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            {summary.usersCount}
                          </Typography>
                          <Typography>Usuarios</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink href="/administracion/usuarios" passHref>
                            <Button size="small" color="primary">
                              Ver usuarios
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            {summary.categoryCount}
                          </Typography>
                          <Typography>Categorias</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink href="/administracion/categorias" passHref>
                            <Button size="small" color="primary">
                              Ver categorias
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                    <Grid item md={3}>
                      <Card raised>
                        <CardContent>
                          <Typography variant="h1">
                            {summary.zoneCount}
                          </Typography>
                          <Typography>Zonas</Typography>
                        </CardContent>
                        <CardActions>
                          <NextLink href="/administracion/zonas" passHref>
                            <Button size="small" color="primary">
                              Ver zonas
                            </Button>
                          </NextLink>
                        </CardActions>
                      </Card>
                    </Grid>
                  </Grid>
                )}
              </ListItem>
              <ListItem>
                <Typography component="h1" variant="h1">
                  Grafico de Ventas
                </Typography>
              </ListItem>
              <ListItem>
                <Bar
                  data={{
                    labels: summary.salesData.map((x) => x._id),
                    datasets: [
                      {
                        label: 'Ventas',
                        backgroundColor: 'rgba(255, 195, 0, 1)',
                        data: summary.salesData.map((x) => x.totalSales),
                      },
                    ],
                  }}
                  options={{
                    legend: { display: true, position: 'right' },
                  }}
                ></Bar>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AdminPanel), { ssr: false });
