import * as types from "./constants";

const reducer = (state = 2, action) => {
    switch (action.type) {
        case types.UPDATE_STATUS:
            return state + 1;
        default:
            return state;
    }
}
export default reducer;