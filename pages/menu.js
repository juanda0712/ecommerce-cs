import NextLink from 'next/link';
import { useState } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CardActionArea,
  Box,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import Layout from '../components/Layout';
import classes from '../utils/classes';
import Product from '../models/Product';
import Category from '../models/Category';
import db from '../utils/db';

export default function Menu(props) {
  const { categories, availableProducts } = props;
  const [category, setCategory] = useState('papas');
  const [categoryTitle, setCategoryTitle] = useState('Papas');
  //FUNCTIONS
  const selectCategoryHandler = (e, category, name) => {
    setCategory(category);
    setCategoryTitle(name);
  };
  return (
    <Layout title="Menu">
      <Grid container spacing={2}>
        <Grid item md={6}>
          <Typography sx={classes.menuTitles}>MEN&Uacute;</Typography>
          {categories.map((category) => (
            <Card
              key={category.identifier}
              onClick={(e) =>
                selectCategoryHandler(e, category.identifier, category.name)
              }
            >
              <CardActionArea sx={{ display: 'flex' }}>
                <CardMedia
                  sx={{ width: 85 }}
                  component="img"
                  image={category.image}
                  alt={category.name}
                />
                <CardContent sx={classes.cardMenu}>
                  <Typography sx={classes.menuTitles}>
                    {category.name}
                  </Typography>
                </CardContent>
                <IconButton>
                  <ArrowForwardIosIcon></ArrowForwardIosIcon>
                </IconButton>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
        <Grid item md={6}>
          <Typography sx={classes.menuTitles}>{categoryTitle}</Typography>
          {availableProducts
            .filter((product) => product.category === category)
            .map((product) => (
              <Card key={product.name}>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea sx={{ display: 'flex' }}>
                    <CardMedia
                      sx={{
                        width: 300,
                        marginBottom: '1rem',
                        flex: '1 0 auto',
                      }}
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <Box>
                      <CardContent>
                        <Typography sx={classes.productsMenu}>
                          {product.name}
                        </Typography>
                      </CardContent>
                      <CardContent>
                        <Typography sx={classes.productsMenu}>
                          &#162;{product.price}
                        </Typography>
                      </CardContent>
                    </Box>
                  </CardActionArea>
                </NextLink>
              </Card>
            ))}
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const availableProductsDocs = await Product.find({
    isAvailable: true,
  }).lean();
  const categoriesDocs = await Category.find({
    isPromotion: true,
  }).lean();
  await db.disconnect();
  return {
    props: {
      availableProducts: availableProductsDocs.map(db.convertDocToObj),
      categories: categoriesDocs.map(db.convertDocToObj),
    },
  };
}
