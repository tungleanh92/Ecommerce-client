import * as constants from './constants'
import { callApi } from './../../common/index'

export const doGetBills = (data) => {
    return dispatch => callApi(constants.API_GET_BILLS, "POST", data, function (res) {
        dispatch(getBills(res.data));
    });
}

export const getBills = (value) => {
    console.log(value);
    return {
        type: constants.GET_BILLS,
        value
    }
}