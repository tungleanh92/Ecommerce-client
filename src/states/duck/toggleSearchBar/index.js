import * as types from "./constants";

const reducer = (state = false, action) => {
    switch (action.type) {
        case types.CLOSE_SEARCH_BAR:
            state = false
            return state;
        case types.OPEN_SEARCH_BAR:
            state = true
            return state;
        default:
            return state;
    }
}
export default reducer;