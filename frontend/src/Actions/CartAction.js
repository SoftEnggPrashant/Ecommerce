import axios from "axios";
import {
  addCartRequest,
  addCartRequestSuccess,
  getCartRequest,
  getCartRequestFail,
  getCartRequestSuccess,
} from "../Reducers/CartsProduct";
import { removeCartRequest } from "../Reducers/CartsProduct";
import { removeCartRequestSuccess } from "../Reducers/CartsProduct";
const baseUrl = "http://localhost:4000/api/v1";

export const getCarts = (userId) => async (dispatch) => {
  try {
    dispatch(getCartRequest());
    const { data } = await axios.get(`${baseUrl}/getCart/${userId}`, {
      withCredentials: true,
    });
    dispatch(getCartRequestSuccess(data.carts));
  } catch (error) {
    dispatch(getCartRequestFail(error.message));
  }
};

export const addToCartAction = (userId, ProductId) => async (dispatch) => {
  try {
    dispatch(addCartRequest());
    const { data } = await axios.post(
      `${baseUrl}/addtoCart/new`,
      { userId, ProductId },
      { withCredentials: true }
    );
    console.log(data);
    dispatch(addCartRequestSuccess());
  } catch (error) {
    console.log("Add to Cart Error", error.message);
  }
};

export const removeCart = (ProductId) => async(dispatch)=>{
    try{
        dispatch(removeCartRequest());
        const {data} = await axios.delete(`${baseUrl}/deleteCart/${ProductId}`,{withCredentials:true});
        console.log(data);
        dispatch(removeCartRequestSuccess());
    }
    catch(error){
        console.log("Remove cart error",error.message);
    }
}
