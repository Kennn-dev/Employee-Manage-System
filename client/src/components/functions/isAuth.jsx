import { decodeToken, isExpired } from "react-jwt"
import Cookies from 'js-cookie'
import {auth} from '../../graphql/var/authVar'

export default function setAuthWithCookie(){
    const token = Cookies.get('accessToken') 
    if(token){
        auth(true)
    }
}
