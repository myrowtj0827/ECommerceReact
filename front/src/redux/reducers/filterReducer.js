import {
    PRODUCT_ALL,
    SET_CURRENT_PRODUCT,
    SET_SORT_PRODUCT,
    SCRAPING_FORM_API
} from "../actions/types/types"

const initialState = {
    product: {},
    productList: [],
    scrapingProduct: []
};

export default function (state = initialState, action) {
    switch(action.type){
        case SET_CURRENT_PRODUCT:
            return {
                ...state,
                product: action.payload
            };
        case PRODUCT_ALL:
            return {
                ...state,
                productList: action.payload
            };
        case SET_SORT_PRODUCT:
            return {
                ...state,
                productSortList: action.payload
            };

        case SCRAPING_FORM_API:
            return {
                ...state,
                scrapingProduct: action.payload
            };
        default:
            return state;
    }
}
