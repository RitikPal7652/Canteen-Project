import { configureStore } from '@reduxjs/toolkit';
import {cartReducer } from '../Redux/cart/cartSlice.js';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'cart',
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);
// const store = configureStore({reducer: {
//   cart: cartReducer, // <-- cartReducer is cartSlice.reducer
//   // counter: counterReducer
// }});

// export default store;