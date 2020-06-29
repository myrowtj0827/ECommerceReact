import axios from "axios";
import config from "../../../config/index"

import {
    SET_CURRENT_PRODUCT,
    MESSAGE_FORM_API,
    USER_LOADING,
    PRODUCT_ALL
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
        .get(config.SIM_API_URL + "api/filters/get-product-all" )
        .then(res => {
            console.log('#####', res.data);
            dispatch({
                type: PRODUCT_ALL,
                payload: res.data.results,
            });

            alert('get success');
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





export const filterProduct = (productData, history) => dispatch => {
    axios
        .post(config.SIM_API_URL + "api/filters/get-product-id", {product_id: productData.id})
        .then(res => {
            dispatch({
                type: SET_CURRENT_PRODUCT,
                payload: true,
            });

            history.push("/");
        })
        .catch(err => {
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