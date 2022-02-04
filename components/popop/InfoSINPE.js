import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from '@mui/material';
import React from 'react';
import classes from '../../utils/classes';

export default function InfoSINPE({
  openSINPE = false,
  closeSINPEModalHandler,
  SINPEHandler,
  totalPrice,
}) {
  return (
    <Modal open={openSINPE} onClose={closeSINPEModalHandler}>
      <Box sx={classes.menuPopop}>
        <Card>
          <CardContent>
            <Typography sx={classes.modalFont4}>Datos SINPE Móvil</Typography>
            <Typography sx={classes.modalFont5}>Teléfono: 88888888</Typography>
            <Typography sx={classes.modalFont5}>
              Nombre: BRANDON CORDERO TENCIO
            </Typography>
            <Typography> </Typography>
            <Typography sx={classes.modalFont5}>
              * Realice el pago con los datos anteriores
            </Typography>
            <Typography sx={classes.modalFont5}>
              * Recuerde tener el comprobante para verificar el pago
            </Typography>
            <Typography sx={classes.modalFont4}>
              Total a pagar: &#162;{totalPrice}
            </Typography>
          </CardContent>
          <CardActions>
            <Button sx={classes.buttonSINPE} onClick={closeSINPEModalHandler}>
              Cancel
            </Button>
            <Button sx={classes.buttonSINPE} onClick={SINPEHandler}>
              Listo
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Modal>
  );
}
