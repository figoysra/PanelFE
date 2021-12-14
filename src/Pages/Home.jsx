import Nav from  "../Components/Navbar"
// import data from "./data"
import { Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import "./css/Home.css"
import { useEffect } from "react";
import { GET_DATA_PICTURE } from "../Redux/action/productAction";
import { API_URL } from "../utils";

const Home  = () =>{
    const dispatch = useDispatch()
    const products = useSelector(store => store.products)
    
    useEffect(()=>{
        dispatch(GET_DATA_PICTURE())
    },[])
    // console.log(products)
    return(
        <>
            <Nav />
            <Container fluid>
                <div className="mainPage mt-3 mb-3">
                {products.all.map((e,i)=>{
                    return(
                        <div className="postBox" key={i}>
                            <img src={`${API_URL}/${e.product_image}`} alt="" />
                            <div className="image__overlay image__overlay--primary">
                                <div className="image__title">{e.product_name}</div>
                                <p className="image__description">
                                    {e.product_desc}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            </Container>
        </>
    )
}
export default Home