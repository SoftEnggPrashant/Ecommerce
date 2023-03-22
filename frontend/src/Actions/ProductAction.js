import axios from "axios";
import {
  fetchProductSuccess,
  fetchProductStart,
  fetchProductFail,
} from "../Reducers/ProductReducer";

export const fetchProduct = () => async (dispatch) => {
  try {
    dispatch(fetchProductStart());
    const { data } = await axios.get(`http://localhost:4000/api/v1/products?page=${1}`);
    console.log("insite the action",data);
    dispatch(fetchProductSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(fetchProductFail(error));
  }
};
