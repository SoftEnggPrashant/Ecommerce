import axios from "axios";
import {
  getProductDetailStart,
  getProductDetailSuccess,
  getProductDetailError,
  reviewSubmiteRequest,
  reviewSubmiteRequestSuccess,
  reviewDeleteRequest,
} from "../Reducers/ProductDetails";

export const fetchProductDetail = (id) => async (dispatch) => {
  try {
    dispatch(getProductDetailStart());
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/products/details/${id}`,
      { withCredentials: true }
    );
    dispatch(getProductDetailSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getProductDetailError(error));
  }
};

export const submitReviewAction = (review) => async (dispatch) => {
  try {
    dispatch(reviewSubmiteRequest());
    const { data } = await axios.put(
      "http://localhost:4000/api/v1/review",
      review,
      { withCredentials: true }
    );
    console.log("submit review", data);
    dispatch(reviewSubmiteRequestSuccess());
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteReviewAction = (productId) => async (dispatch) => {
  try {
    dispatch(reviewDeleteRequest());
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/reviews?productId=${productId}`,
      { withCredentials: true }
    );
    console.log(data);
  } catch (error) {
    console.log(error.response.data.message);
  }
};
