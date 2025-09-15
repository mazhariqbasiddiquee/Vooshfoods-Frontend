import axios from 'axios';



const axioInstance = axios.create({
    baseURL:"https://vooshfoods-backend-qh78.onrender.com",
    withCredentials:true,
    headers:{
        'Content-Type':'application/json'
    }
})




export const getServerResponse = async (payload:any) => axioInstance.post(`/search/query`,payload)
export const getAllDocuments = async () => axioInstance.get(`/search/all-documents`)
export const clearSession = async () => axioInstance.post(`/search/clear-session`)