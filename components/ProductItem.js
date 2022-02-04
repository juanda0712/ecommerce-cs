import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';
import NextLink from 'next/link';

export default function ProductItem({ product }) {
  return (
    <Card>
      <NextLink href={`/producto/${product.slug}`} passHref>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            title={product.name}
          ></CardMedia>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item md={4} xs={3}>
                <Typography sx={{ textAlign: 'left', fontSize: '1.4rem' }}>
                  {product.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '2.5rem',
                    textAlign: 'left',
                    color: '#ff5733',
                  }}
                >
                  &#162;{product.price}
                </Typography>
              </Grid>
              <Grid item md={8} xs={9}>
                <Typography sx={{ textAlign: 'left', fontSize: '1rem' }}>
                  Descripcion: {product.description}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </NextLink>
    </Card>
  );
}
