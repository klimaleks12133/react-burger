import {
    SET_TAB
} from "../actions/TabInfo";
import { SAUCE } from '../../utils/DataName';
import { tabInfoReducer, initialState } from "./TabInfo";
describe('tab-info reducer', () => {
    it("should return the initial state", () => {
        expect(tabInfoReducer(undefined, {}))
            .toEqual(initialState);
    });
    it("should handle SET_TAB", () => {
        expect(tabInfoReducer(initialState, { type: SET_TAB, tab: SAUCE }))
            .toEqual({ ...initialState, tab: SAUCE });
    });
});