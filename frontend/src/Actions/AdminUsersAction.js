import axios from "axios";
import { getAllUserRequest, getAllUserRequestFail, getAllUserRequestSuccess } from "../Reducers/Users";

const baseUrl = 'http://localhost:4000/api/v1';

export const getAllusers = ()=> async(dispatch)=>{
    try{
        dispatch(getAllUserRequest());
        const {data} = await axios.get(`${baseUrl}/admin/users`,{withCredentials:true});
        console.log(data);
        dispatch(getAllUserRequestSuccess(data.users));
    }
    catch(error){
        dispatch(getAllUserRequestFail());
    }
}