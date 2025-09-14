import axios from 'axios';

const axioInstance = axios.create({
    baseURL:"https://vooshfoods-backend-qh78.onrender.com/",
    withCredentials:true,
    headers:{
        'Content-Type':'application/json'
    }
})

// Request interceptor to check sessionid
axioInstance.interceptors.request.use(
    (config) => {
        const sessionid = document.cookie.split(';').find(c => c.trim().startsWith('sessionid='))
        console.log('Request sessionid:', sessionid ? 'Available' : 'Not found')
        return config
    }
)

// Response interceptor to check sessionid
axioInstance.interceptors.response.use(
    (response) => {
        const sessionid = document.cookie.split(';').find(c => c.trim().startsWith('sessionid='))
        console.log('Response sessionid:', sessionid ? 'Available' : 'Not found')
        return response
    }
)


export const getServerResponse = async (payload:any) => axioInstance.post(`/search/query`,payload)
export const getAllDocuments = async () => axioInstance.get(`/search/all-documents`)
export const clearSession = async () => axioInstance.post(`/search/clear-session`)