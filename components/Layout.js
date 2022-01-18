/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Link,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AddIcon from '@mui/icons-material/Add';
import useMediaQuery from '@mui/material/useMediaQuery';
import classes from '../utils/classes';
import theme from '../utils/theme';
import StyledFab from '../utils/styledFab';
import Image from 'next/image';

export default function Layout({ title, description, children }) {
  const isDesktop = useMediaQuery('(min-width:600px)');
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  //Functions
  const navbarClickHandler = (e, redirect) => {
    if (redirect) {
      router.push(redirect);
    }
  };
  const userMenuHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const userMenuClickHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const closeHandler = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Head>
        <title>
          {title ? `${title} - El Cruce del Sabor` : 'El Cruce del Sabor'}
        </title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />

        {isDesktop ? (
          <AppBar position="sticky" sx={classes.appbar}>
            <Toolbar sx={classes.toolbar}>
              {/* LOGO */}
              <Box>
                <NextLink href="/" passHref>
                  <Link>
                    <Image
                      src="/images/nueva.png"
                      alt="El Cruce del Sabor"
                      width={75}
                      height={75}
                    ></Image>
                  </Link>
                </NextLink>
              </Box>
              {/*NAVBAR */}
              <Box>
                <Button
                  onClick={(e) => navbarClickHandler(e, '/menu')}
                  sx={classes.navbarButton}
                >
                  Men&uacute;
                </Button>
                <Button
                  onClick={(e) => navbarClickHandler(e, '/combos')}
                  sx={classes.navbarButton}
                >
                  Combos
                </Button>
                <Button
                  onClick={(e) => navbarClickHandler(e, '/ordenar')}
                  sx={classes.brand}
                >
                  Ordene Aqu&iacute;
                </Button>
                <Button
                  onClick={(e) => navbarClickHandler(e, '/nosotros')}
                  sx={classes.navbarButton}
                >
                  Nosotros
                </Button>
                <Button
                  onClick={(e) => navbarClickHandler(e, '/contacto')}
                  sx={classes.navbarButton}
                >
                  Contacto
                </Button>
              </Box>
              {/* PROFILE */}
              <Box>
                <IconButton
                  size="large"
                  aria-label="Muestra las compras"
                  onClick={(e) => userMenuClickHandler(e, '/compras')}
                  sx={classes.infoButton}
                >
                  <ShoppingBagIcon />
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="Cuenta del usuario"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={userMenuHandler}
                  sx={classes.infoButton}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={closeHandler}
                >
                  <MenuItem onClick={(e) => userMenuClickHandler(e, '/perfil')}>
                    Perfil
                  </MenuItem>
                  <MenuItem
                    onClick={(e) =>
                      userMenuClickHandler(e, '/historial-compra')
                    }
                  >
                    Historial Compra
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
        ) : (
          <AppBar position="sticky" sx={classes.appbar}>
            <Toolbar sx={classes.toolbar}>
              {/* TOP APPBAR */}
              <Box>
                <IconButton
                  size="large"
                  aria-label="Cuenta del usuario"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={userMenuHandler}
                  sx={classes.infoButton_m}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={closeHandler}
                >
                  <MenuItem onClick={(e) => userMenuClickHandler(e, '/perfil')}>
                    Perfil
                  </MenuItem>
                  <MenuItem
                    onClick={(e) =>
                      userMenuClickHandler(e, '/historial-compra')
                    }
                  >
                    Historial Compra
                  </MenuItem>
                </Menu>
              </Box>
              <Box>
                <NextLink href="/" passHref>
                  <Link>
                    <Image
                      src="/images/nueva.png"
                      alt="El Cruce del Sabor"
                      width={75}
                      height={75}
                    ></Image>
                  </Link>
                </NextLink>
              </Box>
              <Box>
                <IconButton
                  size="large"
                  aria-label="Muestra las compras"
                  onClick={(e) => userMenuClickHandler(e, '/compras')}
                  sx={classes.infoButton_m}
                >
                  <ShoppingBagIcon />
                </IconButton>
              </Box>
            </Toolbar>
            {/*BOTTON APPBAR */}
            <AppBar position="fixed" sx={classes.appbar_m}>
              <Toolbar>
                <StyledFab
                  aria-label="add"
                  onClick={(e) => navbarClickHandler(e, '/ordenar')}
                >
                  <AddIcon />
                </StyledFab>
              </Toolbar>
            </AppBar>
          </AppBar>
        )}

        <Container component="main" maxWidth="xl" sx={classes.main}>
          {children}
        </Container>

        <Box component="footer" sx={classes.footer}>
          <Typography>Todos los derechos reservados.</Typography>
        </Box>
      </ThemeProvider>
    </>
  );
}
