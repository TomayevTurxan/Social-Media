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

//get one user (id)
export const getAllUsersbyID = async(id)=>{
    let users;
    await axios.get(`${BASE_URL}/Users/${id}`)
    .then((response)=>{
        users = response.data;
    })
    return users;
}


//Put user
export const updateUseryByIDPut = async (id, updatedData) => {
    let updatedCategory;
    await axios.put(`${BASE_URL}/Users/${id}`, updatedData)
        .then((response) => {
            updatedCategory = response.data;
        })
        .catch((error) => {
            console.error('Error updating user:', error);
        });
    return updatedCategory;
}


export const blockUser = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/Users/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Error blocking user");
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      throw error;
    }
  };