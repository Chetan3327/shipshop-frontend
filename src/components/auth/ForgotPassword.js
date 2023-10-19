import axios from "axios"
import { useState } from "react"
const BASE_URL = process.env.REACT_APP_BASE_URL
const ForgotPassword = () => {
    const [displayForm, setDisplayForm] = useState(true)
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState("")
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
        setErrorMessage("")
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const requiredFields = ['email', 'newPassword'];
        const missingFields = requiredFields.filter(field => !formData[field]);
        if (missingFields.length > 0) {
          const missingFieldNames = missingFields.join(', ');
          setErrorMessage(`Required Fields missing: ${missingFieldNames}`);
          return;
        }
        axios.post(`${BASE_URL}/password-reset`, formData).then((response) => {
            console.log(response)
            setDisplayForm(false)
            setErrorMessage(response.data.message)
        })
    }
    return (
        <div>
            {displayForm ? (<form>
                <input type="email" name="email" placeholder="email" onChange={(e) => handleInputChange(e)} />
                <input type="text" name="newPassword" placeholder="new password" onChange={(e) => handleInputChange(e)} />
                <input type="submit" value="Submit" onClick={(e) => handleSubmit(e)} />
            </form>) : (<p>✉️📨📧</p>)}
            {errorMessage && (<p>{errorMessage}</p>)}
        </div>
    )
}

export default ForgotPassword