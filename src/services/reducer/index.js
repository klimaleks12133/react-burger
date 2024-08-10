import { combineReducers } from 'redux';
import { loadIngredientsReducer } from './LoadingIngredients';
import { burgerConstructorReducer } from './BurgerConstructor';
import { ingredientWindowReducer } from './Ingredient';
import { createOrderReducer } from './Order';
import { tabInfoReducer } from './TabInfo';

export default combineReducers({
    loadIngredients: loadIngredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientWindow: ingredientWindowReducer,
    createOrder: createOrderReducer,
    tabInfo: tabInfoReducer
});