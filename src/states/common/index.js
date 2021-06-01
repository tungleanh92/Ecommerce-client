import * as constants from "./constants";
import { success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const axios = require("axios");

export const callApi = (url, method, data, success) => {
    return axios({
        url: `${constants.URL}/${url}`,
        method: method,
        data: { data: data }
    })
        .then(function (res) {
            success(res.data)
        })
        .catch(function (err) {
            if (err) {
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                ) {
                    error({
                        title: "Lỗi",
                        text: err.response.data.message,
                        destroy: true,
                        delay: 3000
                    });
                } else if (err.response) {
                    error({
                        title: "Lỗi",
                        text: err.response.statusText,
                        destroy: true,
                        delay: 3000
                    });
                }
            }
        });
};