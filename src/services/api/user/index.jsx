import axios from "axios";
import { BASE_URL } from "../BASE_URL";

//get all Users
export const getAllUsers = async()=>{
    let users;
    await axios.get(`${BASE_URL}/Users`)
    .then((response)=>{
        users = response.data;
        // console.log(users)
    })
    return users;
}

//get one category (id)
export const getCategoryByID = async(id)=>{
    let users;
    await axios.get(`${BASE_URL}/Users/${id}`)
    .then((response)=>{
        users = response.data;
    })
    return users;
}

