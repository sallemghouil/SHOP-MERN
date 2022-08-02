import {
    ADD_PRODUCT_FAIL,
    DELETE_PRODUCT_FAIL,
    GET_ALL_PRODUCTS_FAIL,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ONE_PRODUCT_FAIL,
    GET_ONE_PRODUCT_SUCCESS,
    LOADING_PRODUCTS,
    UPDATE_PRODUCT_FAIL,
  } from "../constants/productActionsTyp";
  
  const initialState = {
    loading: false,
    products: [],
    errors: null,
    oneProduct: {}
  };
  
  export const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case LOADING_PRODUCTS:
        return { ...state, loading: true };
      case GET_ALL_PRODUCTS_SUCCESS:
        return { ...state, products: payload, loading: false };
      case GET_ALL_PRODUCTS_FAIL:
        return { ...state, loading: false, errors: payload };
        case ADD_PRODUCT_FAIL:
          return { ...state, errors: payload };
          case DELETE_PRODUCT_FAIL:
            return { ...state, errors: payload };
          case GET_ONE_PRODUCT_SUCCESS:
              return { ...state, oneProduct: payload };
          case GET_ONE_PRODUCT_FAIL:
                    return { ...state, errors: payload  };
          case UPDATE_PRODUCT_FAIL:
                  return { ...state, errors: payload  };
      default:
        return state;
    }
  };