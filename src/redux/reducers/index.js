import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import categories from "./categoryReducer";
import newsReducer from "./newsReducer";
import favoriteReducer from "./favoriteReducer";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";
import filterReducer from "./filterReducer";
import orderReducer from "./orderReducer";
import shopReducer from "./shopReducer";
import compareReducer from "./compareReducer";
import messageReducer from "./messageReducer";
import reklamaReducer from "./reklamaReducer.js";
import btcReducer from "./btcReducer";

const reducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  category: categories,
  news: newsReducer,
  favorite: favoriteReducer,
  cart: cartReducer,
  user: userReducer,
  filter: filterReducer,
  order: orderReducer,
  shop: shopReducer,
  compare: compareReducer,
  message: messageReducer,
  reklama: reklamaReducer,
  btc: btcReducer,
});

export default reducer;
