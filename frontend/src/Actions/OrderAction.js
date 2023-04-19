import axios from "axios"
import { orderRequest, orderRequestFail, orderRequestSuccess } from "../Reducers/Order"
const API_URL = "http://localhost:4000/api/v1/admin/orders"

export const getAllOrders = ()=> async(dispatch)=>{
    try{
        dispatch(orderRequest());
        const {data} = await axios.get(API_URL,{withCredentials:true});
        dispatch(orderRequestSuccess(data.orders))
    }
    catch(error){
        dispatch(orderRequestFail(error.message));
    }
}