import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';
import NextLink from 'next/link';

export default function ProductItem({ product, addToShoppingHandler }) {
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
            <Typography>{product.name}</Typography>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography>&#162;{product.price}</Typography>
        <Button
          size="small"
          color="primary"
          onClick={() => addToShoppingHandler(product)}
        >
          Agregar a la compra
        </Button>
      </CardActions>
    </Card>
  );
}
