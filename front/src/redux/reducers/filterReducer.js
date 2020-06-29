import {
    PRODUCT_ALL,
    SET_CURRENT_PRODUCT
} from "../actions/types/types"

const initialState = {
    product: {},
    productList: [],
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
        default:
            return state;
    }
}