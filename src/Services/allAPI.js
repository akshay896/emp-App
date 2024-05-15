import commonAPI from "./commonAPI";
import SERVER_URL from "./server_url";

export const addDetailsAPI = async (Details) => {
  return await commonAPI("POST", `${SERVER_URL}/allDetails`, Details);
};

export const getAllDetailsAPI = async()=>{
  return await commonAPI("GET",`${SERVER_URL}/allDetails`,"")
} 

export const removeDetailsAPI = async(empId)=>{
  return await commonAPI("DELETE",`${SERVER_URL}/allDetails/${empId}`,{})
}

export const updateDetailsAPI = async (empId, updatedDetails) => {
  return await commonAPI("PUT", `${SERVER_URL}/allDetails/${empId}`, updatedDetails);
};