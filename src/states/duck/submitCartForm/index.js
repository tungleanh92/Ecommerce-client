import * as types from "./constants";

const reducer = (state = {}, action) => {
    switch (action.type) {
        case types.SUBMIT_CART_FORM:
            state = action.value;
            return state;
        default:
            return state;
    }
}
export default reducer;