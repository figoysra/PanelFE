import axios from "axios"
import { API_URL } from "../../utils";

export const HANDLE_LOGIN = (form) =>{
    return new Promise ((resolve, reject)=>{
        // console.log(values)
        axios.post(`${API_URL}/login`, form)
        .then((response)=>{
            localStorage.setItem("token", response.data.token)
            resolve(response)
        }).catch((error)=>{
            reject(error)
        })
    })
}

export const REGISTER_USER = (form) =>{
    return new Promise ((resolve, reject)=>{
        axios.post(`${API_URL}/register`, form)
        .then((response)=>{
            resolve(response.data)
        })
        .catch((err)=>{
            reject(err.response)
        })
    })
}
export const GET_DATA_USER = () =>{
    return (dispatch)=>{
        const token = localStorage.getItem('token')
        const headers = {
            token : token
        } 
        dispatch(getusersPending())
        axios.get(`${API_URL}/user`,{headers})
        .then((response)=>{
            dispatch(getusersFulfilled(response.data.result))
        }).catch((err)=>{
            dispatch(getusersRejected(err))
            // console.log(err)
        })
    } 
}
export const UPDATE_USER = (form) =>{
    return new Promise((resolve, reject)=>{
        const token = localStorage.getItem("token")
        const headers = {
            "Content-Type" : "multipart/form-data",
            token : token
        }
        axios.put(`${API_URL}/updateUser`, form, {headers})
        .then((response)=>{
            resolve(response.data)
        })
        .catch((err)=>{
            reject(err)
        })
    })
}


const getusersPending = () =>{
    return{
        type : 'GET_USER_PENDING',
    }
}
const getusersFulfilled = (payload) =>{
    return{
        type : 'GET_USER_FULFILLED',
        payload
    }
}
const getusersRejected = () =>{
    return{
        type : 'GET_USER_REJECTED',
        payload : 'Error'
    }
}

