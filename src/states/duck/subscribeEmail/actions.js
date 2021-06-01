import * as constants from './constants'
import { callApi } from './../../common/index'

export const subscribeEmail = (email) => {
    return dispatch => callApi(constants.API_SUBSCRIBE_EMAIL, "POST", email, function (res) {
        dispatch(passMessage(res.data));
    });
}

export const passMessage = (value) => {
    return {
        type: constants.SUBSCRIBE_EMAIL,
        value
    }
}