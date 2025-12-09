import {useSelector} from "react-redux"
import {jwtDecode} from "jwt-decode"
const useAuth=()=>{
    const token=useSelector((state)=>state.auth.token)
    if(token){
        const obj=jwtDecode(token);
        return [obj]
    }
    return [{"token":" "}]
       
}
export default useAuth;
