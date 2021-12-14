import Navbar from "../Components/Navbar"
import { Container, Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import Data from "./data"
import "./css/Profile.css"
import { useDispatch, useSelector } from "react-redux";
import { GET_DATA_USER, UPDATE_USER } from "../Redux/action/usersAction";
import { GET_MY_PRODUCT, INSERT_PRODUCT } from "../Redux/action/productAction";
import { API_URL } from "../utils";

const Profile = () =>{
    const dispatch = useDispatch()
    const users = useSelector(store => store.users)
    const products = useSelector((store) => store.products);
    const [modalAdd, setModalAdd] = useState(false);
    // const [modal, setModal] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        name: "",
        gender: "",
        image: "",
        photoPriview : "",
        photoPriview_product : "",
        product_name : "",
        product_image : "",
        product_desc : ""
    });
    const toggleAdd = () => setModalAdd(!modalAdd);
    const logOut = () =>{
        localStorage.removeItem("token")
        navigate("/")
    }

    const getPersonalData = () => {
        dispatch(GET_DATA_USER())
    }
    const getMyProduct = () =>{
        dispatch(GET_MY_PRODUCT())
    }
    const changeTextProfile = (e) =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const changeInputFileProfile= (e) => {
        setForm({
            ...form,
            image: e.target.files[0],
            photoPriview: URL.createObjectURL(e.target.files[0])
        })
    }
    const changeInputFileProducts= (e) => {
        setForm({
            ...form,
            product_image: e.target.files[0],
            photoPriview_product: URL.createObjectURL(e.target.files[0])
        })
    }

    useEffect(()=>{
        setForm({
            email  : users.user.email,
            name : users.user.name,
            gender : users.user.gender,
            image : users.user.profilePic
        })
    },[users.user])

    const handleAddProduct = (e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("product_name", form.product_name);
        formData.append("product_desc", form.product_desc);
        formData.append("image", form.product_image);
        INSERT_PRODUCT(formData)
        .then((res)=>{
            alert('Insert Data Success')
            setForm({
                product_name : "",
                product_image : "",
                product_desc : "",
                photoPriview_product : "",
            })
            setModalAdd(!modalAdd);
            getMyProduct()
        }).catch((err)=>{
            console.log(err)
            alert("Cannot Insert Data");
        })
    }
    const handleUpdateProfile = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", form.email)
        formData.append("gender", form.gender);
        formData.append("name", form.name);
        formData.append("image", form.image);
        UPDATE_USER(formData)
        .then((res)=>{
            alert('Update User Success')
            
            getPersonalData()
        }).catch((err)=>{
            console.log(err)
            alert("Cannot Update Data");
        })
    }
    
    useEffect(()=>{
        getPersonalData()
        getMyProduct()   
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[])
    return(
        <>  
            <Navbar />
            <Container className="mt-3">
                <Row>
                    <Col xs="3">
                        <div className="p-3 shadow borderInfo">
                            <div className="d-flex justify-content-center mt-3 mb-4 ">
                                <div className="borderProfile">
                                    <img src={form.photoPriview === undefined ? `${API_URL}/${form.image}`: form.photoPriview} alt="" />
                                </div>
                            </div>
                            
                            <h1 className="text-center profileName text-capitalize">{users.user.name}</h1>
                            <p className="text-center m-0 profileEmail">{users.user.email}</p>
                            <p className="text-center profileGender">{users.user.gender === 1 ? "He / Him" : "She / Her" }</p>
                            <div className="mt-3 mb-3 d-flex justify-content-center">
                                <button type="" className="btn btnEdit btnLogOut" onClick={logOut}>Log Out</button>
                            </div>
                        </div>
                    </Col>
                    <Col xs="9">
                        <div className="borderInfo shadow p-4">
                            <h1 className="profileTitle">Edit Profile</h1>
                            <hr />
                            <form onSubmit={handleUpdateProfile}>
                                <div className="d-flex w-100">
                                    <div className="w-75">
                                        <label for="" className="mb-1 mt-2">Name</label> <br />
                                        <input type="text" name="name" value={form.name} onChange={changeTextProfile} className="form-control" />
                                    </div>
                                    <div className="w-25 ms-2">
                                        <label className="mb-1 mt-2">Gender</label>
                                        <select id="inputState" className="form-control" name="gender" value={form.gender} onChange={changeTextProfile} >
                                            <option selected={form.gender === 1 ? true : false} value="1">He / Him</option>
                                            <option selected={form.gender === 2 ? true : false} value="2">She / Her</option>
                                        </select>
                                    </div>
                                </div>
                                <label for="" className="mb-2 mt-2">Email</label> <br />
                                <input type="" name="email" onChange={changeTextProfile} value={form.email} className="form-control" />
                                <div className="d-flex">
                                    <button type="submit" className="mt-3 mb-3 btn btnProduct btnEdit">Save</button>
                                    <label className="mt-3 mb-3 ms-3 btn btnProduct btnDelete">
                                        Rubah Img
                                        <input type="file" className="btnImage" name="image" onChange={changeInputFileProfile} />
                                    </label> 
                                </div> 
                            </form>
                        </div>
                    </Col>
                </Row>
                <div className="shadow p-4 borderInfo mt-3">
                    <h2 className="profileTitle" > Product <span className="fw-bold cursor" onClick={toggleAdd} >+</span></h2>
                    <Modal isOpen={modalAdd} toggle={toggleAdd} >
                        <ModalHeader toggle={toggleAdd}>Add Product</ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col xs="4">
                                    <div className="addImage ">
                                        <img src={form.photoPriview_product === undefined ? "https://lh3.googleusercontent.com/proxy/q3HjkzAJR5ql6FwKl_mRpaGRThjNEdfwJxr913iJoHbQBvwen1FEmrtGD5xgLyI6kEUi2fxXpGfeZfm4NxFO4HeiCZMT-nqREvI72WfdStHiQg" : form.photoPriview_product } alt="" />
                                    </div>
                                    
                                </Col>
                                <Col xs="8">
                                    <div className="ms-2">
                                        <input type="" name="product_name" value={form.product_name} onChange={changeTextProfile} placeholder="Product Name" className="inputProduct" />
                                        <textarea rows="4" cols="35" placeholder="Product Description textarea" value={form.product_desc} name="product_desc" onChange={changeTextProfile}  />
                                        <button type="" onClick={handleAddProduct} className="btn btnEdit btnProduct mt-2">Save</button>
                                        <label type="" className="btn btnEdit btnProduct mt-2 ms-2">
                                            Add Image
                                            <input type="file" name="product_image" className="btnImage" onChange={changeInputFileProducts} />
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                        </ModalBody>
                    </Modal>
                    <hr />
                    <div className="mt-2">
                        <Row>
                            {products.myProduct.map((items,i)=>(
                                <>
                                    <Col xs="3" key={i}>
                                        <div className="borderProduct">
                                            <img src={`${API_URL}/${items.product_image}`} alt="" />
                                        </div>
                                        <p className="fw-bold mt-2 mb-2">{items.product_name}</p>
                                        <div className="mt-2 mb-2">
                                            <button type="" onClick={()=> navigate(`/product/${items.id_products}`)} className="btnEdit btnGo btn me-3">Update Product</button>
                                        </div>
                                    </Col>
                                </>
                            ))}
                        </Row>
                    </div>
                </div>
            </Container>
            
        </>
    )
}
export default Profile