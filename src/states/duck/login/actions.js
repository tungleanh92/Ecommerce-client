import * as constants from './constants'
import { callApi } from './../../common/index'

export const doLogin = (data) => {
    return dispatch => callApi(constants.API_LOGIN, "POST", data, function (res) {
        dispatch(login(res));
    });
}

export const login = (value) => {
    return {
        type: constants.LOGIN,
        value
    }
}