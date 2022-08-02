import axios from "axios";
import { GET_CURRENT_FAIL, GET_CURRENT_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS } from "../constants/userConstants";

export const register = (newUser, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/register",
      newUser
    );
    dispatch({ type: REGISTER_SUCCESS, payload: response.data.user });
    navigate("/login");
  } catch (error) {
    console.log(error);
    dispatch({ type: REGISTER_FAIL, payload: error });
  }
};

export const login = (logedUser, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/login",
      logedUser
    );
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGIN_FAIL, payload: error });
  }
};

export const getCurrent = () => async (dispatch) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/users/current",{headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}
      );
      dispatch({ type: GET_CURRENT_SUCCESS, payload: response.data });
      
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_CURRENT_FAIL, payload: error });
    }
  };


export const logout=(navigate)=>{
    navigate("/login")
    return {type:LOGOUT}
}