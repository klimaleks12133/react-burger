import { combineReducers } from 'redux';
import { loadIngredientsReducer } from './LoadIngredients';
import { burgerConstructorReducer } from './BurgerConstructor';
import { ingredientWindowReducer } from './IngredientWindow';
import { createOrderReducer } from './CreateOrder';
import { tabInfoReducer } from './TabInfo';
import { authReducer } from './Auth';
import { ordersAllReducer } from './OrdersAll';
import { ordersUserReducer } from './OrdersUser';
import { getOrderReducer } from './GetOrder';

export default combineReducers({
    loadIngredients: loadIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientWindow: ingredientWindowReducer,
    createOrder: createOrderReducer,
    getOrder: getOrderReducer,
    tabInfo: tabInfoReducer,
    auth: authReducer,
    ordersAll: ordersAllReducer,
    ordersUser: ordersUserReducer
});