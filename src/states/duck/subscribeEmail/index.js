import * as types from "./constants";

const reducer = (state = [], action) => {
    switch (action.type) {
        case types.SUBSCRIBE_EMAIL:
            console.log(action.value);
            state = action.value;
            return state;
        default:
            return state;
    }
}
export default reducer;