import {Routes, Route, Navigate} from "react-router-dom"
import Home from '../Pages/Home';
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Profile from "../Pages/Profile";
import Product from "../Pages/Product"

const Router = () =>{
    const token = localStorage.getItem("token")
    return (
    <Routes>
        <Route path="/" element={<Home />} exact/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<Product />} />
        {/* <Route path="/login" >
                <Login />
            </Route>
            <Route path="/register" >
                <Register />
            </Route> */}
        <Route
            path="profile"
            element={(() => {
                if (token) {
                    return <Profile to={`/profile`} />;
                } else {
                    return <Navigate to="/login" />;
                }
            })()}
        />
        {/* <Guard path='/profile' element={Profile} /> */}
    </Routes>
    );
}
export default Router