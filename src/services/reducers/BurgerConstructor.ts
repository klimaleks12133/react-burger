import { TIngredient, TIngredientConstructor } from '../../utils/Types';
import {
    SET_BUN,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    SWAP_INGREDIENTS,
    SET_SUM,
    TBurgerConstructorActions
} from '../actions/BurgerConstructor';

export type TBurgerConstructorState = {
    bun: TIngredient | null;
    ingredients: Array<TIngredientConstructor>;
    sum: number;
}

const initialState: TBurgerConstructorState = {
    bun: null,
    ingredients: [],
    sum: 0
}

export function burgerConstructorReducer(state = initialState, action: TBurgerConstructorActions): TBurgerConstructorState {
    switch (action.type) {
        case SET_BUN:
            return { ...state, bun: action.item };
        case ADD_INGREDIENT:
            return { ...state, ingredients: [...state.ingredients, action.item] };
        case DELETE_INGREDIENT:
            return { ...state, ingredients: [...state.ingredients].filter((_item, index) => index !== action.index) };
        case SWAP_INGREDIENTS:
            const newState = { ...state, ingredients: [...state.ingredients] };
            [newState.ingredients[action.index1], newState.ingredients[action.index2]] = [newState.ingredients[action.index2], newState.ingredients[action.index1]];
            return newState;
        case SET_SUM:
            return { ...state, sum: action.sum };

        default:
            return state;
    }
}
