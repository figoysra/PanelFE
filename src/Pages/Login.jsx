import "./css/Login.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { HANDLE_LOGIN } from "../Redux/action/usersAction"

const Login = () =>{
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState();
    const [input, setInput] = useState({
        email : "",
        password : ""
    })
    const changeInputLogin = (e) =>{
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    // console.log(input)
    
    const handleSubmit = (e) =>{
        e.preventDefault()
        if (input.email || input.password) {
            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input.email)) {
                HANDLE_LOGIN(input)
                    .then((response) => {
                        navigate("/");
                        console.log(response)
                        // console.log(response)
                    })
                    .catch((err) => {
                        // alert(err.error)
                        console.log(err)
                        setErrorMsg("");
                    });
            } else {
                setErrorMsg("Please enter correct email address");
            }
        } else {
            setErrorMsg("Please fill in all fields");
            // console.log(form.errorMessage);
        }
    }
    return(
        <>
            <div className="bgLogin">
                <div className="p-4 borderLogin shadow">
                    <button onClick={()=> navigate('/')} className="btn">back to Home </button>
                    <h1 className="text-center mt-5">Login</h1>
                    <form className="d-flex flex-column align-items-center mt-4" onClick={handleSubmit}>
                        <label for="">Email</label>
                        <input type="email" name="email" onChange={changeInputLogin} value={input.email}  className="inputForm" />
                        <label for="">Password</label>
                        <input type="password" name="password" onChange={changeInputLogin} value={input.password} className="inputForm" />
                        <p className="mt-2 mb-2 text-danger">{errorMsg}</p>
                        <button type="submit" className="btn mt-5 btnLog">Login</button>
                        <button type="" className="btn mt-3 btnRegis" onClick={()=>navigate('/register')}>Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Login