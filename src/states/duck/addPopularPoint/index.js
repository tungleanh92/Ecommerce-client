import * as types from "./constants";

const reducer = (state = [], action) => {
    switch (action.type) {
        case types.ADD_POPULAR_POINT:
            state = action.value;
            return state;
        default:
            return state;
    }
}
export default reducer;