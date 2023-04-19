import axios from "axios";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFail,
  userLogout,
} from "../Reducers/UserReducer";

const API_URL = "http://localhost:4000/api/v1";

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(fetchUsersStart());
    const { data } = await axios.post(`${API_URL}/register`, userData);
    dispatch(fetchUsersSuccess(data));
  } catch (error) {
    dispatch(fetchUsersFail( error.response.data.message));
  }
};

export const loginUser = (loginData) => async (dispatch) => {
  try {
    dispatch(fetchUsersStart());
    const { data } = await axios.post(`${API_URL}/login`, loginData,{withCredentials: true});
    console.log(data);
    dispatch(fetchUsersSuccess(data.user));
  } catch (error) {
    console.log(error);
    dispatch(fetchUsersFail( error.response.data.message));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(fetchUsersStart());
    const { data } = await axios.get(`${API_URL}/me`,{withCredentials: true});
    dispatch(fetchUsersSuccess(data.user));
  } catch (error) {
    dispatch(fetchUsersFail( error.response.data.message));
  }
};

export const logOut = () => async(dispatch) => {
  try {
    await axios.get(`${API_URL}/logout`);
    dispatch(userLogout());
  } catch (error) {
    console.log(error);
  }
};
