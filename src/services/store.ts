import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { socketMiddleware } from './middleware/SocketMiddleware';
import { wsOrdersAllActions } from './actions/OrdersAll';
import { wsOrdersUserActions } from './actions/OrdersUser';

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(socketMiddleware(wsOrdersAllActions))
        .concat(socketMiddleware(wsOrdersUserActions)),
      devTools: process.env.NODE_ENV !== 'production'
});
