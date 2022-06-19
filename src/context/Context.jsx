import { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReduer, productReducer } from "./Reducers";

const Cart = createContext();

const Context = ({ children }) => {
  // everytime you call the data data changes so we use seed to keep it same
  // faker.seed(99);

  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.product(),
    price: faker.commerce.price(),
    image: `${faker.image.fashion()}?random=${Math.round(Math.random() * 1000)}`,
    inStock: faker.helpers.arrayElements([0, 3, 5, 6, 7]),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.helpers.arrayElements([1, 2, 3, 4, 5])
  }));

  const [state, dispatch] = useReducer(cartReduer, {
    products: products,
    cart: []
  });
  // console.log(products); 
  
  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: ""
  })
  return <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>{children}</Cart.Provider>;
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
