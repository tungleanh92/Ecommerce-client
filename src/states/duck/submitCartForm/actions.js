import * as constants from './constants'
import { callApi } from './../../common/index'

export const submitCartForm = (data) => {
    console.log(data);
    return dispatch => callApi(constants.API_SUBMIT_CART_FORM, "POST", data, function (res) {
        dispatch(submitForm(res.data));
    });
}

export const submitForm = (value) => {
    return {
        type: constants.SUBMIT_CART_FORM,
        value
    }
}