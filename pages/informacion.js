import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Link,
  List,
  ListItem,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import Cookies from 'js-cookie';

import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import Form from '../components/Form';
import { Store } from '../utils/Store';
import classes from '../utils/classes';
import Zone from '../models/Zone';
import db from '../utils/db';

export default function Informacion(props) {
  const { state, dispatch } = useContext(Store);
  const { zones, districts } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { shopping } = state;
  const { shippingAddress, deliveryMethod } = shopping;
  const [open, setOpen] = useState(false);
  const [district, setDistrict] = useState('');
  const [zone, setZone] = useState('');

  useEffect(() => {
    if (!deliveryMethod) {
      router.push('/compras');
    }
    if (deliveryMethod === 'carry_out') {
      setValue('fullName', shippingAddress.fullName);
      setValue('phoneNumber', shippingAddress.phoneNumber);
    } else {
      setValue('fullName', shippingAddress.fullName);
      setValue('phoneNumber', shippingAddress.phoneNumber);
      setValue('address', shippingAddress.address);
      setValue('expressAddress', shippingAddress.expressAddress);
    }
  }, []);

  //FUNCTIONS

  const submitCarryOutHandler = ({ fullName, phoneNumber }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, phoneNumber },
    });
    Cookies.set(
      'shippingAddress',
      JSON.stringify({
        fullName,
        phoneNumber,
      })
    );
    router.push('/payment');
  };

  const submitExpressHandler = ({
    fullName,
    address,
    phoneNumber,
    expressAddress,
  }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, phoneNumber, expressAddress },
    });
    Cookies.set(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        phoneNumber,
        expressAddress,
      })
    );
    router.push('/payment');
  };

  const clickOpenHandler = () => {
    setOpen(true);
  };
  const closeHandler = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const changeDistrictHandler = (e) => {
    setDistrict(e.target.value || '');
  };

  const changeZoneHandler = (e) => {
    setZone(e.target.value || '');
  };

  return (
    <Layout title="Informacion">
      <CheckoutWizard />
      <Form
        onSubmit={
          deliveryMethod === 'carry_out'
            ? handleSubmit(submitCarryOutHandler)
            : handleSubmit(submitExpressHandler)
        }
      >
        <Typography component="h1" variant="h1">
          Shipping Address
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="Nombre Completo"
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'minLength'
                        ? 'El nombre debe tener mas caracteres'
                        : 'Nombre Completo requerido'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 8,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="phoneNumber"
                  label="Numero de telefono"
                  error={Boolean(errors.phoneNumber)}
                  helperText={
                    errors.phoneNumber
                      ? errors.phoneNumber.type === 'minLength'
                        ? 'El número de teléfono debe tener 8 digitos'
                        : 'El número de télefono es requerido'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          {deliveryMethod === 'express' ? (
            <>
              <ListItem>
                <Link onClick={clickOpenHandler}>Seleccionar Ubicacion</Link>
              </ListItem>
              <ListItem>
                <Controller
                  name="addressZone"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <Dialog
                      disableEscapeKeyDown
                      open={open}
                      onClose={closeHandler}
                      id="addressZone"
                      {...field}
                    >
                      <DialogTitle>Completa el formulario</DialogTitle>
                      <DialogContent>
                        <Box
                          component="form"
                          sx={{ display: 'flex', flexWrap: 'wrap' }}
                        >
                          <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel htmlFor="demo-dialog-native">
                              Distrito
                            </InputLabel>
                            <Select
                              native
                              value={district}
                              onChange={changeDistrictHandler}
                              input={
                                <OutlinedInput
                                  label="Distrito"
                                  id="demo-dialog-native"
                                />
                              }
                            >
                              <option aria-label="None" value="" />
                              {districts.map((dist) => (
                                <option key={dist} value={dist}>
                                  {dist}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-dialog-select-label">
                              Zona
                            </InputLabel>
                            <Select
                              labelId="demo-dialog-select-label"
                              id="demo-dialog-select"
                              value={zone}
                              onChange={changeZoneHandler}
                              input={<OutlinedInput label="Zona" />}
                            >
                              {zones
                                .filter((zone) => zone.district === district)
                                .map((zone) => (
                                  <MenuItem key={zone.zone} value={zone.zone}>
                                    {zone.zone}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={closeHandler}>Cancel</Button>
                        <Button onClick={closeHandler}>Ok</Button>
                      </DialogActions>
                    </Dialog>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="address"
                      label="Dirección"
                      error={Boolean(errors.address)}
                      helperText={
                        errors.address
                          ? errors.address.type === 'minLength'
                            ? 'La dirección debe ser mayor que 1'
                            : 'La dirección es requerida'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
            </>
          ) : (
            <></>
          )}
          <ListItem>
            <Button type="submit" sx={classes.buttonCheckout} fullWidth>
              Continue
            </Button>
          </ListItem>
        </List>
      </Form>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const zonesDocs = await Zone.find({}).lean();
  const districts = await Zone.find().distinct('district');
  await db.disconnect();
  return {
    props: {
      zones: zonesDocs.map(db.convertDocToObj),
      districts,
    },
  };
}
