import Navbar from "../Components/Navbar"
import { Container } from "reactstrap";
import { useParams, useNavigate   } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_MY_PRODUCT_DETAIL, UPDATE_PRODUCT, DELETE_PRODUCT } from "../Redux/action/productAction";
import { API_URL } from "../utils";
import "./css/Products.css"

const Products = () =>{
    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const product = useSelector(store => store.products)
    const [form, setForm] = useState({
        product_name : "",
        product_image : "",
        product_desc : "",
        photoPriview_product : "",
    })
    
    const changeText = (e) =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const changeInputFile= (e) => {
        setForm({
            ...form,
            product_image: e.target.files[0],
            photoPriview_product: URL.createObjectURL(e.target.files[0])
        })
    }
    // console.log(form)
    useEffect(()=>{
        dispatch(GET_MY_PRODUCT_DETAIL(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
        setForm({
            product_name: product.detail.product_name,
            product_image: product.detail.product_image,
            product_desc: product.detail.product_desc,
        });
    },[product.detail])

    const handleUpdate = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("product_name", form.product_name);
        formData.append("product_desc", form.product_desc);
        formData.append("image", form.product_image);
        UPDATE_PRODUCT(formData, id)
        .then((response)=>{
            alert("Update Success")
            dispatch(GET_MY_PRODUCT_DETAIL(id));
        }).catch((err)=>{
            alert("Update Failed")
        })
    }
    // console.log(form)
    const handleDeleteData = (event) =>{
        event.preventDefault()
        DELETE_PRODUCT(id)
        .then((res)=>{
            alert('Delete Products Success')
            navigate("/profile")
        }).catch((err)=>{
            console.log(err)
            alert("Cannot Delete Data");
        })
    }
    return (
        <div>
            <Navbar />
            <div className="mt-4 d-flex  align-items-center flex-column">
                <Container>
                    <h1 className="text-center">Update Product</h1>
                    <div className="d-flex mt-4">
                        <div className="w-50 ">
                            <label for="" className="mb-2">Product Name</label>
                            <input type="text" className="form-control" name="product_name" value={form.product_name} onChange={changeText} />
                            <label for="" className="mb-2 mt-4">Product Description</label><br />
                            <textarea rows="" cols="" className="form-control textAreaUpdate"  name="product_desc" value={form.product_desc} onChange={changeText} />
                            <br />
                            <label type="" className="btn btn-secondary mt-4 me-2">
                                Rubah Gambar
                                <input type="file" name="product_image" className="btnImage" onChange={changeInputFile} />
                            </label>
                            <button type="" onClick={handleUpdate} className="btn btn-success mt-4 me-2">Save Data</button>
                            <button type="" onClick={handleDeleteData} className="btn btn-danger mt-4">Delete</button>
                        </div>
                        <div className="w-50" >
                            <div className=" ms-3 borderUpdate">
                                <img src={`${form.photoPriview_product === undefined ?  `${API_URL}/${form.product_image}` : form.photoPriview_product}`} alt="" />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}
export default Products