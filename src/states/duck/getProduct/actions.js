import * as constants from './constants'
import { callApi } from './../../common/index'

export const getProductByOption = (data) => {
    return dispatch => callApi(constants.API_GET_PRODUCT, "POST", data, function (res) {
        dispatch(getProduct(res.data));
    });
}

export const getProduct = (value) => {
    return {
        type: constants.GET_PRODUCT,
        value
    }
}