import { useSelector, useDispatch } from "react-redux"
import { clearToken } from "../features/auth/authSlice"
import { Link, useNavigate } from 'react-router-dom';
const LogOut = () => {
    const { isUserLoggedIn } = useSelector((state) => state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearToken());
        navigate("/login")
    }


    return (<>
        {isUserLoggedIn&&<button onClick={handleLogout}>are uou sure?</button>}
    </>)

}
export default LogOut