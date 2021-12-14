import { Route, Navigate } from "react-router-dom";

const Guard = ({component : Component, ...rest}) => {
    const Token = localStorage.getItem('token')
    // console.log(Token)
    return(
        <Route {...rest} render={
            (props) =>{
                if(Token){
                    return <Component {...props} />
                }else{
                    return(<Navigate to='/login' />)
                }
            }
        }
        />
    )
}
export default Guard