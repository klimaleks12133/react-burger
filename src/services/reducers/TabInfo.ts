import { BUN } from '../../utils/DataName';
import { SET_TAB, TTabInfoActions } from '../actions/TabInfo';

type TTabInfoState = {
    tab: string;
}
const initialState: TTabInfoState = {
    tab: BUN
}

export function tabInfoReducer(state = initialState, action: TTabInfoActions): TTabInfoState {
    switch (action.type) {
        case SET_TAB:
            return { ...state, tab: action.tab };
        default:
            return state;
    }
}
