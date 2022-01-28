import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import auth from "./slices/auth";
import user from "./slices/user";
import product from "./slices/product";
import reservation from "./slices/reservation";

const authConfig = {
  key: "#auth",
  storage,
};

const userConfig = {
  key: "#user",
  storage,
  blacklist: ["currentEditUser"],
};

const productConfig = {
  key: "#product",
  storage,
  blacklist: ["currentProduct"],
};

const reducers = combineReducers({
  auth: persistReducer(authConfig, auth),
  user: persistReducer(userConfig, user),
  product: persistReducer(productConfig, product),
  reservation,
});

const store = createStore(reducers, composeWithDevTools());
const persistor = persistStore(store);

export { store, persistor };
