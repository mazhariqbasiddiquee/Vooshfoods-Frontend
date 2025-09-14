 import {clearSession, getAllDocuments, getServerResponse} from './index'

export const sendQuery=async(payload:any)=>{
    try{
        const response=await getServerResponse(payload)
        console.log("Response from server:",response)
    return response.data
    }catch(error){
        console.error("Error fetching data:",error)
        throw error
    }
}


export const  fetchAlldocuments=async()=>{
    try{
        const response=await getAllDocuments()  

        console.log("Response from server:",response)
    return response.data
    }catch(error){
        console.error("Error fetching data:",error)
        throw error
    }  
    
}

export const clearUserSession=async()=>{    
    try{

        const response=await clearSession()  
        console.log("Response from server:",response)
    return response.data
    }catch(error){      
        console.error("Error fetching data:",error)
        throw error
    }
}


