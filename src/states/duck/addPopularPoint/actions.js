import * as constants from './constants'
import { callApi } from './../../common/index'

export const addPopularPoint = (id) => {
    return dispatch => callApi(constants.API_ADD_POPULAR_POINT, "POST", id, function (res) {
        dispatch(passMessage(res));
    });
}

export const passMessage = (value) => {
    return {
        type: constants.ADD_POPULAR_POINT,
        value
    }
}