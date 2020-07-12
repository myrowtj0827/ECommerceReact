import axios from "axios";
import config from "../../../config/index"

import {
    SCRAPING_MESSAGE_FORM_API,
    SCRAPING_PRODUCT_ALL,
    SCRAPING_FORM_API,
    SCRAPING_USER_LOADING,
    SET_SCRAPING_SORT_PRODUCT,
    MESSAGE_FORM_API,
    // SET_SCRAPING_DELETE
} from "../types/types";

export const gettingLink = () => dispatch => {
    axios
        .post(config.SIM_API_URL + "api/scrapingProduct/scraping-product")
        .then(res => {
            alert('success');
            console.log(res);
        })
        .catch(err => {
            alert('Failed - Back end turned off !');
            dispatch({
                type: SCRAPING_FORM_API,
                payload: err.response ? err.response.data : {error: "error"}
            });
        })
};

export const scrapingAllProducts = () => dispatch => {
    axios
        .get(config.SIM_API_URL + "api/scrapingProduct/scraping-product-all", )
        .then(res => {
            dispatch({
                type: SCRAPING_PRODUCT_ALL,
                payload: res.data.results,
            });

        })
        .catch(err => {
            alert('fail' + JSON.stringify(err));
            dispatch({
                type: SCRAPING_MESSAGE_FORM_API,
                payload: err.response ? err.response.data : {error: "error"}
            });
            dispatch({
                type: SCRAPING_USER_LOADING,
                payload: false,
            })
        })
};

export const ScrapingSort = (category, history) => dispatch => {
    axios
        .post(config.SIM_API_URL + "api/scrapingProduct/scraping-product-sort", {category})
        .then(res => {
            dispatch({
                type: SET_SCRAPING_SORT_PRODUCT,
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

// export const ScrapingDelete = () => dispatch => {
//     axios
//         .post(config.SIM_API_URL + "api/scrapingProduct/delete-product")
//         .then(res => {
//             console.log(res);
//             dispatch({
//                 type: SET_SCRAPING_DELETE,
//                 payload: res.data.results,
//             });
//
//         })
//         .catch(err => {
//             alert('fail-delete');
//             dispatch({
//                 type: MESSAGE_FORM_API,
//                 payload: err.response ? err.response.data : {error: "error"}
//             });
//         })
// };

