import { BUN } from '../../utils/DataName';
import { SET_TAB } from '../actions/TabInfo';

const initialState = {
    tab: BUN
}

export function tabInfoReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TAB:
            return { ...state, tab: action.tab };
        default:
            return state;
    }
}