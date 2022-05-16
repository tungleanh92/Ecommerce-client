import * as types from "./constants";

const reducer = (state = [], action) => {
    switch (action.type) {
        case types.DELETE_PRODUCT:
            state = action.value;
            return state;
        case types.UPDATE_PRODUCT:
            state = action.value;
            return state;
        case types.UPDATE_BRAND:
            state = action.value;
            return state;
        case types.UPDATE_CATEGORY:
            state = action.value;
            return state;
        case types.UPDATE_COLOR:
            state = action.value;
            return state;
        case types.SET_DELIVERED:
            state = action.value;
            return state;
        default:
            return state;
    }
}
export default reducer;