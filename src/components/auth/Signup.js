import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const BASE_URL = process.env.REACT_APP_BASE_URL
const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const handleInputChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
        setErrorMessage("")
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const requiredFields = ['email', 'password', 'name']
        const missingFields = requiredFields.filter((field) => !formData[field])
        if(missingFields.length > 0){
            const missingFieldNames = missingFields.join(", ")
            setErrorMessage(`required fields missing: ${missingFieldNames}`)
            return ;
        }
        axios.post(`${BASE_URL}/auth/register`, formData).then((response) => {
            console.log(response)
            if(response.status === 201){
                navigate('/login')
            }
        }).catch((error) => {
            if(error.response){
                setErrorMessage(error.response.data.error)
            }else{
                setErrorMessage("an error occured while processing this request")
            }
        })
    }
    return (
        <div>
            Signup
            <form>
                <input type="text" name="name" placeholder="name"  onChange={(e) => handleInputChange(e)}/>
                <input type="email" name="email" placeholder="email" onChange={(e) => handleInputChange(e)}/>
                <input type="password" name="password" placeholder="password" onChange={(e) => handleInputChange(e)} />
                <input type="submit" value="Signup" onClick={(e) => handleSubmit(e)} />
            </form>
            {errorMessage && (<p>{errorMessage}</p>)}
        </div>
    )
}
export default Signup