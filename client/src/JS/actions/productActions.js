import {
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    GET_ALL_PRODUCTS_FAIL,
    GET_ALL_PRODUCTS_SUCCESS,
    GET_ONE_PRODUCT_FAIL,
    GET_ONE_PRODUCT_SUCCESS,
    LOADING_PRODUCTS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_SUCCESS,
  } from "../constants/productActionsTyp";
  import axios from "axios";
  
  export const getALLProducts = () => async (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS });
    try {
      const response = await axios.get("http://localhost:5000/products");
      dispatch({
        type: GET_ALL_PRODUCTS_SUCCESS,
        payload: response.data.allProduct,
      });
    } catch (error) {
      dispatch({ type: GET_ALL_PRODUCTS_FAIL, payload: error });
    }
  };
  
  export const addProduct = (newProduct,navigate) => async (dispatch) => {
      try {
      const response = await axios.post(
        "http://localhost:5000/products/add",
        newProduct,
        {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
      );
      dispatch({ type: ADD_PRODUCT_SUCCESS });
      dispatch(getALLProducts())
      navigate("/")
    } catch (error) {
      console.log(error);
      alert(error.response.data.msg)
      dispatch({ type: ADD_PRODUCT_FAIL,payload:error });
    }
  };
  
  export const deleteProduct = (id) => async (dispatch) => {
      try {
        const response = await axios.delete(`http://localhost:5000/products/${id}`);
        dispatch({
          type: DELETE_PRODUCT_SUCCESS,
        });  
        dispatch(getALLProducts())
      } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAIL, payload: error });
      }
    };
  
    
  export const getOneProduct = (id) => async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      dispatch({
        type: GET_ONE_PRODUCT_SUCCESS,
        payload: response.data
      }); 
    } catch (error) {
      dispatch({ type: GET_ONE_PRODUCT_FAIL, payload: error });
    }
  };
  export const updateOneProduct = (id, newOne, navigate) => async (dispatch) => {
    try {
      const response = await axios.put(`http://localhost:5000/products/${id}`, newOne);
      dispatch({
        type: UPDATE_PRODUCT_SUCCESS,
      });      
      dispatch(getALLProducts())
      navigate("/")
    } catch (error) {
      dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error });
    }
  };