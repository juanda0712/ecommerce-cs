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
  searchButton: {
    backgroundColor: '#f8c040',
    padding: 1,
    borderRadius: '0 5px 5px 0',
    '& span': {
      color: '#000000',
    },
  },
  //layout
  main: {
    marginTop: 2,
    minHeight: '80vh',
  },
  footer: {
    marginTop: 1,
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
    fontSize: '1.6rem',
  },
  grow: {
    flexGrow: 1,
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
    fontSize: '1.2rem',
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
  },
  menuCategories: {
    fontSize: '1.5rem',
    textAlign: 'left',
    color: '#000000',
    marginLeft: '6rem',
    marginTop: '1rem',
    marginBottom: '1.5rem',
    '&:hover:not(.Mui-disabled)': {
      color: '#b03c23',
    },
  },
  productsMenu: {
    fontSize: '1.4rem',
    textAlign: 'center',
    color: '#000000',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  productsMenu1: {
    fontSize: '2rem',
    textAlign: 'center',
    color: '#ff5733',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  productBoxTitles: {
    textAlign: 'center',
    fontSize: '1.5rem',
    marginTop: '1.5rem',
  },
  cardMenu: {
    flex: '1 0 auto',
  },

  productGroupButtons: {
    borderRadius: 35,
    color: '#ff5733',
    marginLeft: '0.5rem',
    marginRight: '0.5rem',
    borderColor: '#ff5733',
    '&:hover': {
      borderColor: '#ff5733',
    },
    '&.Mui-disabled': {
      color: '#ff5733',
    },
  },
  buttonCheckout: {
    borderRadius: 35,
    backgroundColor: '#ff5733',
    color: '#ffffff',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#ff5733',
    },
  },
  buttonSINPE: {
    borderRadius: 35,
    marginLeft: 'auto',
    backgroundColor: '#ff5733',
    color: '#ffffff',
    '&:hover': {
      color: '#ffffff',
      backgroundColor: '#ff5733',
    },
  },
  buttonBack: {
    borderRadius: 35,
    marginLeft: 'auto',
    backgroundColor: '#FAF9F8',
    color: '#000',
    '&:hover': {
      color: '#000',
      backgroundColor: '#d9d9d9',
    },
  },
  shoppingFont: {
    fontSize: '1rem',
    color: '#000000',
  },

  //compras styles

  tableHead: {
    fontSize: '1.3rem',
    textAlign: 'center',
    color: '#000000',
  },
  tableBody: {
    fontSize: '1rem',
    textAlign: 'center',
    color: '#000000',
  },

  //Popop
  menuPopop: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '10px solid #ff5733',
    borderRadius: 8,
    boxShadow: 24,
    p: 4,
    backgroundColor: '#000000',
    '&:hover': {
      backgroundColor: '#000000',
    },
  },
  menuPopop2: {
    width: 500,
    bgcolor: 'background.paper',
    border: '8px solid #ff5733',
    marginLeft: '6rem',
    marginTop: '1.5rem',
    borderRadius: 8,
    p: 4,
  },
  closePopop: {
    cursor: 'pointer',
    position: 'absolute',
    display: 'block',
    right: '-20px',
    top: '-20px',
    fontSize: '1.3rem',
    background: '#ffffff',
    borderRadius: '50%',
    border: '0.1rem solid #ff5733',
    color: '#ff5733',
    '&:hover': {
      color: '#ff5733',
      backgroundColor: '#ffffff',
    },
  },
  modalFont: {
    fontSize: '1.3rem',
    textAlign: 'center',
    color: '#ffffff',
    marginTop: '0.8rem',
    marginBottom: '0.8rem',
  },
  modalFont2: {
    fontSize: '1.3rem',
    textAlign: 'center',
    color: '#ff5733',
    marginTop: '0.8rem',
    marginBottom: '0.8rem',
  },
  modalFont3: {
    fontSize: '2rem',
    textAlign: 'center',
    color: '#ffffff',
    marginTop: '0.8rem',
    marginBottom: '0.8rem',
  },
  modalFont4: {
    fontSize: '1.5rem',
    color: '#000',
    textAlign: 'center',
    marginTop: '0.8rem',
    marginBottom: '0.8rem',
  },
  modalFont5: {
    fontSize: '1.1rem',
    color: '#000',
    marginTop: '0.8rem',
    marginBottom: '0.8rem',
  },
  modalCard: {
    flex: '1 0 auto',
  },
  modalCardAction: {
    display: 'flex',
  },
  modalCardMedia: {
    width: 80,
    paddingLeft: '1rem',
  },
  cursor: {
    color: '#ff5733',
    '&:hover:not(.Mui-disabled)': {
      cursor: 'pointer',
      color: '#b03c23',
    },
  },
};

export default classes;
