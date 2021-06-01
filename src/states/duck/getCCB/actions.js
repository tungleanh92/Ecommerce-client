import * as constants from './constants'
import { callApi } from './../../common/index'

export const getCCB = () => {
    return dispatch => callApi(constants.API_GET_CCB, "GET", null, function (res) {
        console.log(res.data);
        dispatch(getCCBObj(res.data));
    });
}

export const getCCBObj = (value) => {
    return {
        type: constants.GET_CCB,
        value
    }
}