import * as constants from './constants'
import { callApi } from './../../common/index'

export const doUpdateProduct = (data) => {
    return dispatch => callApi(constants.API_UPDATE_PRODUCT, "POST", data, function (res) {
        dispatch(updateProduct(res));
    });
}

export const doDeleteProduct = (data) => {
    return dispatch => callApi(constants.API_DELETE_PRODUCT, "POST", data, function (res) {
        dispatch(deleteProduct(res));
    });
}

export const doUpdateCategory = (data) => {
    return dispatch => callApi(constants.API_UPDATE_CATEGORY, "POST", data, function (res) {
        dispatch(updateCategory(res));
    });
}

export const doUpdateBrand = (data) => {
    return dispatch => callApi(constants.API_UPDATE_BRAND, "POST", data, function (res) {
        dispatch(updateBrand(res));
    });
}

export const doUpdateColor = (data) => {
    return dispatch => callApi(constants.API_UPDATE_COLOR, "POST", data, function (res) {
        dispatch(updateColor(res));
    });
}

export const updateProduct = (value) => {
    return {
        type: constants.UPDATE_PRODUCT,
        value
    }
}

export const deleteProduct = (value) => {
    return {
        type: constants.DELETE_PRODUCT,
        value
    }
}

export const updateCategory = (value) => {
    return {
        type: constants.UPDATE_CATEGORY,
        value
    }
}

export const updateColor = (value) => {
    return {
        type: constants.UPDATE_COLOR,
        value
    }
}

export const updateBrand = (value) => {
    return {
        type: constants.UPDATE_BRAND,
        value
    }
}