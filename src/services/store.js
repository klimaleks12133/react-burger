import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import { wsOrdersAllActions } from './actions/OrdersAll';
import { wsOrdersUserActions } from './actions/OrdersUser';

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(socketMiddleware(wsOrdersAllActions))
        .concat(socketMiddleware(wsOrdersUserActions)),
      devTools: process.env.NODE_ENV !== 'production'
});