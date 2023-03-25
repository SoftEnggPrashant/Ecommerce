import axios from "axios";
import { fetchUsersStart, fetchUsersSuccess, fetchUsersFail } from "../Reducers/UserReducer";

const API_URL = "http://localhost:4000/api/v1";

export const registerUser = (userData) => async (dispatch) => {
    try {
        dispatch(fetchUsersStart());
        const {token} = await axios.post(`${API_URL}/register`, userData);
        console.log(token);
        dispatch(fetchUsersSuccess(token));
    } catch (err) {
        console.log(err);
        dispatch(fetchUsersFail(err));
    }
}