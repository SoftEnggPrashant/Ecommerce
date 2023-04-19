import axios from "axios";
import {
  adminProductRequest,
  adminProductRequestFail,
  adminProductRequestSuccess,
} from "../Reducers/AdminProducts";
import {
  deleteProductRequest,
  deleteProductRequestFail,
  deleteProductResponse,
} from "../Reducers/ProductDelete";
const URL = "http://localhost:4000/api/v1";

export const fetchProductAdmin = () => async (dispatch) => {
  try {
    dispatch(adminProductRequest());
    const { data } = await axios.get(`${URL}/admin/products`, {
      withCredentials: true,
    });
    dispatch(adminProductRequestSuccess(data.products));
  } catch (error) {
    dispatch(adminProductRequestFail(error.message));
  }
};

export const deleteProductAdmin = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    console.log(id);
    const { data } = await axios.delete(`${URL}/admin/products/delete/${id}`, {
      withCredentials: true,
    });
    console.log("delete request", data);
    dispatch(deleteProductResponse(data.message));
  } catch (error) {
    dispatch(deleteProductRequestFail(error.message));
  }
};
