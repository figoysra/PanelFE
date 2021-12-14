import axios from "axios";
import { API_URL } from "../../utils";


export const GET_DATA_PICTURE = () =>{
    return (dispatch)=>{
        dispatch(productsPending())
        axios.get(`${API_URL}/products`)
        .then((response)=>{
            dispatch(productsFulfilled(response.data.result))
            
        }).catch((err)=>{
            dispatch(productsRejected(err))
            // console.log(err)
        })
    } 
}
export const GET_MY_PRODUCT = () =>{
    return (dispatch)=>{
        const token = localStorage.getItem("token")
        const headers = {
            token : token
        }
        dispatch({
            type : "GET_MY_PRODUCT_PENDING"
        })
        axios.get(`${API_URL}/myproducts`, {headers})
        .then((response)=>{
            console.log(response.data)
            dispatch({
                type : "GET_MY_PRODUCT_FULFILLED",
                payload : response.data.result
            })
        })
        .catch((err)=>{
            dispatch({
                type : "GET_MY_PRODUCT_REJECTED",
                payload : err.response
            })
        })
    } 
}
export const GET_MY_PRODUCT_DETAIL = (id) =>{
    return (dispatch)=>{
        const token = localStorage.getItem("token")
        const headers = {
            token : token
        }
        dispatch(myProductsPending())
        axios.get(`${API_URL}/myproducts/${id}`, {headers})
        .then((response)=>{
            // console.log(response.data)
            dispatch(myProductsFulfilled(response.data.result))
        })
        .catch((err)=>{
            dispatch(myProductsRejected(err.response))
        })
    } 
}

export const INSERT_PRODUCT= (form) =>{
    return new Promise ((resolve,reject)=>{
        const token = localStorage.getItem("token")
        const headers = {
            "Content-Type" : "multipart/form-data",
            token : token
        }
        axios.post(`${API_URL}/insertProducts`, form, {headers})
        .then((response)=>{
            resolve(response.data)
        })
        .catch((err)=>{
            reject(err.response)
        })
    })
}

export const UPDATE_PRODUCT= (form,id) =>{
    return new Promise ((resolve,reject)=>{
        const token = localStorage.getItem("token")
        const headers = {
            "Content-Type" : "multipart/form-data",
            token : token
        }
        axios.put(`${API_URL}/updateProducts/${id}`, form, {headers})
        .then((response)=>{
            resolve(response.data)
        })
        .catch((err)=>{
            reject(err.response)
        })
    })
}

export const DELETE_PRODUCT= (id) =>{
    return new Promise ((resolve,reject)=>{
        const token = localStorage.getItem("token")
        const headers = {
            token : token
        }
        axios.delete(`${API_URL}/deleteProducts/${id}`, {headers})
        .then((response)=>{
            resolve(response.data)
        })
        .catch((err)=>{
            reject(err.response)
        })
    })
}

const productsPending = () =>{
    return{
        type : 'GET_ALL_PRODUCTS_PENDING',
    }
}
const productsFulfilled = (payload) =>{
    return{
        type : 'GET_ALL_PRODUCTS_FULFILLED',
        payload
    }
}
const productsRejected = () =>{
    return{
        type : 'GET_ALL_PRODUCTS_REJECTED',
        payload : 'Error'
    }
}

const myProductsPending = () =>{
    return{
        type : 'GET_DETAIL_PRODUCT_PENDING',
    }
}
const myProductsFulfilled = (payload) =>{
    return{
        type : 'GET_DETAIL_PRODUCT_FULFILLED',
        payload
    }
}
const myProductsRejected = () =>{
    return{
        type : 'GET_DETAIL_PRODUCT_FULFILLED',
        payload : 'Error'
    }
}