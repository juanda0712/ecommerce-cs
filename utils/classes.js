const classes = {
  //common
  flex: {
    display: 'flex',
  },
  visible: {
    display: 'initial',
  },
  hidden: {
    display: 'none',
  },
  sort: {
    marginRight: 1,
  },
  fullHeight: { height: '100vh' },
  fullWidth: {
    width: '100%',
  },
  error: {
    color: '#f04040',
  },
  form: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
  },
  //layout
  main: {
    marginTop: 2,
    minHeight: '80vh',
  },
  footer: {
    marginTop: 5,
    textAlign: 'center',
  },
  section: {
    marginTop: 1,
    marginBottom: 1,
  },

  // header
  appbar: {
    backgroundColor: '#ff5733',
    '& a': {
      color: '#ffffff',
      marginLeft: 1,
    },
  },
  appbar_m: {
    backgroundColor: '#ff5733',
    '& a': {
      color: '#ffffff',
      marginLeft: 1,
    },
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  brand: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: 1,
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
    fontSize: '1rem',
    marginLeft: '1.7rem',
    marginRight: '1.7rem',
  },
  infoButton: {
    color: '#ffffff',
    textTransform: 'initial',
    fontSize: '1rem',
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
  },
  infoButton_m: {
    color: '#ffffff',
    textTransform: 'initial',
    fontSize: '1rem',
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
  },

  menuButton: { padding: 0 },
  menuTitles: {
    fontSize: '1.5rem',
    textAlign: 'center',
    color: '#ff5733',
    marginTop: '1.5rem',
    marginBottom: '1.5rem',
  },
  productsMenu: {
    fontSize: '2rem',
    textAlign: 'center',
    color: '#ff5733',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  cardMenu: { flex: '1 0 auto' },
};

export default classes;
