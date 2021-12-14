import './css/Navbar.css'
import {Navbar, Container, NavbarBrand} from "reactstrap"
import { BsSearch } from "react-icons/bs";
import { useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { GET_DATA_USER } from '../Redux/action/usersAction';
import { useSelector } from 'react-redux';
import { API_URL } from '../utils';

const Nav = () =>{
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const users = useSelector(store=> store.users)

    useEffect(()=>{
        dispatch(GET_DATA_USER())
    },[])
    // console.log(users)
    return (
        <>
            <Navbar color="light" light expand="md" className="rubik shadow">
                <Container className='d-flex'>
                    <NavbarBrand className='cursor fw-bold brand'>
                        <div className='brandLogo' onClick={()=> navigate('/')}>
                            Panel
                        </div>
                    </NavbarBrand>
                    <div className='searchMenu ps-3 pe-3 d-flex align-items-center'>
                        <div className='searchBox w-100'>
                            <div className='me-2 ms-3 mb-1'>
                                <BsSearch />
                            </div>
                            <input type="text" />
                        </div>
                    </div>
                    {token === null ? (
                        <div className='secondaryMenu d-flex align-items-center'>
                            <button type="" className='btn btnLogin me-3' onClick={()=> navigate('/login') }>Login</button>
                            <button type="" className='btn btnRegister' onClick={()=> navigate('/register') }>Register</button>
                        </div>
                    ):(
                        <div className='d-flex secondaryMenu align-items-center'>
                            <div className='borderProfile me-2 ms-2'>
                                <img src={`${API_URL}/${users.user.profilePic}`} alt="" />
                            </div>
                            <div className='profileName cursor text-capitalize' onClick={()=>navigate('/profile')} >
                                {users.user.name}
                            </div>
                        </div>
                    )}
                </Container>
            </Navbar>
        </>
    )
}
export default Nav