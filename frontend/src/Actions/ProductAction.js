import axios from "axios";
import {
  fetchProductSuccess,
  fetchProductStart,
  fetchProductFail,
} from "../Reducers/ProductReducer";
import {
  productUpdateRequest,
  productUpdateRequestFail,
  productUpdateRequestSuccess,
} from "../Reducers/ProductUpdate";

let URL = "http://localhost:4000/api/v1/products";

export const fetchProduct = (category, currentPage) => async (dispatch) => {
  console.log(currentPage);
  try {
    dispatch(fetchProductStart());
    if (category === undefined || category === "All") {
      const { data } = await axios.get(
        `${URL}?page=${currentPage}&per_page=${currentPage ? 10 : 50}`,
        { withCredentials: true }
      );
      dispatch(fetchProductSuccess(data));
    } else {
      const { data } = await axios.get(
        `${URL}?category=${category}&page=${1}&per_page=${50}`,
        { withCredentials: true }
      );
      dispatch(fetchProductSuccess(data));
    }
  } catch (error) {
    console.log(error);
    dispatch(fetchProductFail(error.message));
  }
};

export const updateProductAdmin = (id, updateData) => async (dispatch) => {
  try {
    dispatch(productUpdateRequest());
    const { data } = await axios.put(
      `${URL}/admin/products/${id}`,
      updateData,
      { withCredentials: true }
    );
    console.log(data.success);
    dispatch(productUpdateRequestSuccess(data.success));
  } catch (error) {
    dispatch(productUpdateRequestFail(error.message));
  }
};
