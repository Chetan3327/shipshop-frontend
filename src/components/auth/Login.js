import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const BASE_URL = process.env.REACT_APP_BASE_URL

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const handleInputChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
        setErrorMessage("")
    } 
    const handleSubmit = (e) =>{
        e.preventDefault()
        const requiredFields = ['email', 'password'];
        const missingFields = requiredFields.filter(field => !formData[field]);
        if (missingFields.length > 0) {
          const missingFieldNames = missingFields.join(', ');
          setErrorMessage(`Required Fields missing: ${missingFieldNames}`);
          return;
        }
        axios.post(`${BASE_URL}/auth/login`, formData).then((response) => {
            console.log(response)
            if(response.status === 200){
                navigate('/')
                localStorage.setItem('authToken', response.data.token)
            }
        }).catch((error) => {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred while processing your request.');
            }
        });
    }
    return(
        <div>
            Login
            <form>
                <input type="email" placeholder="email" name="email" onChange={(e) => handleInputChange(e)}/>
                <input type="password" placeholder="password" name="password" onChange={(e) => handleInputChange(e)}/>
                <input type="submit" value='Login' onClick={(e) => handleSubmit(e)}/>
            </form>
            <button onClick={() => navigate('/forgotPassword')}>forgot Password</button>
            {errorMessage && (<p>{errorMessage}</p>)}
        </div>
    )
}

export default Login