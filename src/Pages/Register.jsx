import "./css/Register.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { REGISTER_USER } from "../Redux/action/usersAction";

const Register = () =>{
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
        gender : 1,
        name : "",
        profilePic : "defaultImage.jpg",
    })
    const [errorMsg, setErrorMsg] = useState();
    const changeTextProfile = (e) =>{
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }
    const handleSignUp = (e) =>{
        e.preventDefault()
        if (form.email || form.password) {
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) {
                REGISTER_USER(form)
                    .then((response) => {
                        navigate("/login");
                        // console.log(response)
                        // console.log(response)
                    })
                    .catch((err) => {
                        // alert(err.error)
                        // console.log(err)
                        setErrorMsg("Your Data already sign up");
                    });
            } else {
                setErrorMsg("Please enter correct email address");
            }
        } else {
            setErrorMsg("Please fill in all fields");
            // console.log(form.errorMessage);
        }
    }
    return (
        <>
            <div className="bgReg">
                <div className="p-4 borderReg shadow">
                    <button onClick={()=> navigate('/')} className="btn">back to Home </button>
                    <h1 className="text-center mt-3">Register</h1>
                    <form className="d-flex flex-column align-items-center mt-4" onSubmit={handleSignUp}>
                        <label for="">Email</label>
                        <input type="" name="email" value={form.email} onChange={changeTextProfile}  className="inputForm form-control mb-3" />
                        <label for="">Password</label>
                        <input type="" name="password" value={form.password} onChange={changeTextProfile} className="inputForm form-control mb-3" />
                        <label for="">Name</label>
                        <input type="" name="name" value={form.name} onChange={changeTextProfile}  className="inputForm form-control mb-3" />
                        <label for="">Gender</label>
                        <select id="inputState" className="form-control" name="gender" value={form.gender} onChange={changeTextProfile} >
                            <option  value="1">He / Him</option>
                            <option  value="2">She / Her</option>
                        </select>
                        <p className="mt-2 mb-2 text-danger">{errorMsg}</p>
                        <button type="submit" className="btn mt-4 btnRegis">Register</button>
                        <button type="" className="btn mt-3 btnLog" onClick={()=>navigate('/Login')}>Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Register