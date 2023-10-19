import { useNavigate } from "react-router-dom"

const NavBar = () => {
    const navigate = useNavigate()
    return(
        <div className="navbar">
            <span className="link" onClick={() => navigate('/login')}>Login</span>
            <span className="link" onClick={() => navigate('/signup')}>Signup</span>
        </div>
    )
}

export default NavBar