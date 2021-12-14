import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import productReducer from "./reducers/products";
import usersReducer from "./reducers/users";

const reducers = combineReducers({
    products: productReducer,
    users: usersReducer,
});

const middleware = applyMiddleware(thunk,logger)
const store = createStore(reducers, middleware)

export default store