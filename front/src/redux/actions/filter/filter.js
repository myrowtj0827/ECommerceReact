import axios from "axios";
import config from "../../../config/index"

import {
    SET_CURRENT_PRODUCT,
    MESSAGE_FORM_API,
    USER_LOADING,
    PRODUCT_ALL,
    SET_SORT_PRODUCT
} from "../types/types";

export const createProduct = (productData, history) => dispatch => {
    axios
        .post(config.SIM_API_URL + "api/filters/register-product", productData)
        .then(res => {
            alert('success');
            console.log(res);
        })
        .catch(err => {
            alert('fail');
            dispatch({
                type: MESSAGE_FORM_API,
                payload: err.response ? err.response.data : {error: "error"}
            });
        })
};

export const fetchAllProducts = () => dispatch => {
    axios
        .get(config.SIM_API_URL + "api/filters/get-product-all", )
        .then(res => {
            dispatch({
                type: PRODUCT_ALL,
                payload: res.data.results,
            });

        })
        .catch(err => {
            alert('fail' + JSON.stringify(err));
            dispatch({
                type: MESSAGE_FORM_API,
                payload: err.response ? err.response.data : {error: "error"}
            });
            dispatch({
                type: USER_LOADING,
                payload: false,
            })
        })
};

export const SortProduct = (category, history) => dispatch => {
    axios
        .post(config.SIM_API_URL + "api/filters/get-product-sort", {category})
        .then(res => {
            dispatch({
                type: SET_SORT_PRODUCT,
                payload: res.data.results,
            });

        })
        .catch(err => {
            alert('fail-category');
            dispatch({
                type: MESSAGE_FORM_API,
                payload: err.response ? err.response.data : {error: "error"}
            });
        })
};
