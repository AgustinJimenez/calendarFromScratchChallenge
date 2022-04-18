import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
// Imports: Redux Store
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
// Imports: Redux Root Reducer
import reducers from "./datasetReducer";
// Imports: Redux Root Saga
import sagas from "../sagas";
// Redux: Store
//import customReduxMiddleware from './customReduxMiddleware'

import { composeWithDevTools } from "redux-devtools-extension";
// Middleware: Redux Sagas
const sagaMiddleware = createSagaMiddleware();

const show_redux_logs = true;

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  reducers
);

let middlewares = [sagaMiddleware /* , customReduxMiddleware */];
if (show_redux_logs && process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
const persistor = persistStore(store);
// Middleware: Redux Saga
sagaMiddleware.run(sagas);

export { store, persistor };
