import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducers";
import thunk from "redux-thunk";

const composeEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(reducer, composeEnhancer);

export default store;
