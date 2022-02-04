import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

import { Store } from '../utils/Store';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import Form from '../components/Form';
import classes from '../utils/classes';

export default function Pago() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('');
  const { state, dispatch } = useContext(Store);
  const {
    shopping: { shippingAddress },
  } = state;
  useEffect(() => {
    if (!shippingAddress.fullName) {
      router.push('/informacion');
    } else {
      setPaymentMethod(Cookies.get('paymentMethod') || '');
    }
  }, []);

  //FUNCTIONS
  const submitHandler = (e) => {
    closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
      enqueueSnackbar('El método de pago es requerido', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      Cookies.set('paymentMethod', paymentMethod);
      router.push('/pedido');
    }
  };

  return (
    <Layout title="Método de pago">
      <CheckoutWizard activeStep={1}></CheckoutWizard>
      <Form onSubmit={submitHandler}>
        <Typography component="h1" variant="h1">
          Método de Pago
        </Typography>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  label="Tarjeta de Credito/Debito"
                  value="Tarjeta de Credito/Debito"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="Efectivo"
                  value="Efectivo"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="SINPE"
                  value="SINPE"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="submit"
              sx={{ borderRadius: 35 }}
              variant="contained"
              color="primary"
            >
              Continuar
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => router.push('/informacion')}
              sx={classes.buttonBack}
            >
              Atrás
            </Button>
          </ListItem>
        </List>
      </Form>
    </Layout>
  );
}
