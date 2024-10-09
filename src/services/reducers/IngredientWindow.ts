import { TIngredient } from '../../utils/Types';
import { SET_DISPLAYED_INGREDIENT, TIngredientWindowActions } from '../actions/IngredientWindow';

type TIngredientWindowsState = {
    displayedIngredient: TIngredient | null;
}

const initialState: TIngredientWindowsState = {
    displayedIngredient: null
}

export function ingredientWindowReducer(state = initialState, action: TIngredientWindowActions): TIngredientWindowsState {
    switch (action.type) {
        case SET_DISPLAYED_INGREDIENT:
            return { ...state, displayedIngredient: action.item };
        default:
            return state;
    }
}
