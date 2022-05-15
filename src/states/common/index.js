import * as constants from "./constants";
import { success, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const axios = require("axios");

export const callApi = (url, method, data, success) => {
    let token = localStorage.getItem("admin")
    return axios({
        url: `${constants.URL}/${url}`,
        method: method,
        data: { data: data },
        headers: { Authorization: token },
    })
        .then(function (res) {
            success(res.data)
        })
        .catch(function (err) {
            console.log(err);
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

export const callApi2 = (url, method, data, success) => {
    let token = localStorage.getItem("admin")
    return axios({
        url: `${constants.URL}/${url}`,
        method: method,
        data: data,
        headers: { Authorization: token, "Content-Type": "multipart/form-data" },
    })
        .then(function (res) {
            success(res.data)
        })
        .catch(function (err) {
            console.log(err);
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