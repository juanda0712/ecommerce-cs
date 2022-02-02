import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import classes from '../../utils/classes';

export default function Purchase({ open = false, closeModalHandler }) {
  return (
    <Modal open={open} onClose={closeModalHandler}>
      <Box sx={classes.menuPopop}>
        <Button onClick={closeModalHandler} sx={classes.closePopop}>
          &times;
        </Button>
        <Grid container>
          <Grid
            item
            md={12}
            alignContent="center"
            alignItems="center"
            marginLeft="5rem"
          >
            <Box>
              <Image
                src="/images/verification.png"
                alt="verification check"
                width={260}
                height={260}
              />
            </Box>
          </Grid>
          <Grid item md={12} alignContent="center" alignItems="center">
            <Typography sx={classes.modalFont3}>
              ¡Gracias por su compra!
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
