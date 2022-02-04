import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  Typography,
} from '@mui/material';
import React from 'react';
import classes from '../../utils/classes';

export default function SINPELayout({
  openSINPE = false,
  closeSINPEModalHandler,
}) {
  return (
    <Modal open={openSINPE} onClose={closeSINPEModalHandler}>
      <Box sx={classes.menuPopop}>
        <Button onClick={closeSINPEModalHandler} sx={classes.closePopop}>
          &times;
        </Button>
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
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}
