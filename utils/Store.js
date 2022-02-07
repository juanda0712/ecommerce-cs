import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  shopping: {
    shoppingProducts: Cookies.get('shoppingProducts')
      ? JSON.parse(Cookies.get('shoppingProducts'))
      : [],
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress'))
      : '',
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : '',
    deliveryMethod: Cookies.get('deliveryMethod')
      ? Cookies.get('deliveryMethod')
      : '',
    orderComment: Cookies.get('orderComment')
      ? JSON.parse(Cookies.get('orderComment'))
      : '',
  },
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SHOPPING_ADD_PRODUCT': {
      const newProduct = action.payload;
      const existProduct = state.shopping.shoppingProducts.find(
        (product) => product._id === newProduct._id
      );
      const shoppingProducts = existProduct
        ? state.shopping.shoppingProducts.map((product) =>
            product.name === existProduct.name ? newProduct : product
          )
        : [...state.shopping.shoppingProducts, newProduct];
      Cookies.set('shoppingProducts', JSON.stringify(shoppingProducts));
      return { ...state, shopping: { ...state.shopping, shoppingProducts } };
    }
    case 'SHOPPING_REMOVE_ITEM': {
      const shoppingProducts = state.shopping.shoppingProducts.filter(
        (product) => product._id !== action.payload._id
      );
      Cookies.set('shoppingProducts', JSON.stringify(shoppingProducts));
      return { ...state, shopping: { ...state.shopping, shoppingProducts } };
    }
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        shopping: {
          ...state.shopping,
          shippingAddress: {
            ...state.shopping.shippingAddress,
            ...action.payload,
          },
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        shopping: { ...state.shopping, paymentMethod: action.payload },
      };
    case 'SAVE_DELIVERY_METHOD':
      return {
        ...state,
        shopping: { ...state.shopping, deliveryMethod: action.payload },
      };
    case 'SAVE_ORDER_COMMENT':
      return {
        ...state,
        shopping: { ...state.shopping, orderComment: action.payload },
      };
    case 'SHOPPING_CLEAR':
      return {
        ...state,
        shopping: { ...state.shopping, shoppingProducts: [] },
      };
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload };
    case 'USER_LOGOUT':
      return {
        ...state,
        userInfo: null,
        shopping: {
          shoppingProducts: [],
          shippingAddress: '',
          paymentMethod: '',
          deliveryMethod: '',
          orderComment: '',
        },
      };

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
