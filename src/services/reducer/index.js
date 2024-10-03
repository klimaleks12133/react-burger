import { combineReducers } from 'redux';
import { loadIngredientsReducer } from './LoadingIngredients';
import { burgerConstructorReducer } from './BurgerConstructor';
import { ingredientWindowReducer } from './Ingredient';
import { createOrderReducer } from './Order';
import { tabInfoReducer } from './TabInfo';
import { authReducer } from './Auth';
import { ordersAllReducer } from './OrdersAll';
import { ordersUserReducer } from './OrdersUser';
import { getOrderReducer } from './GerOrder';

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