import {LOGIN} from "../Actions/authActions";
import { LOGOUT } from "../Actions/authActions";

const initialState = {
    user: null,
    login:false
}

export default (state=initialState, action)=>{
    switch(action.type){
        case LOGIN:
            return{
                user:action.user,
                login:true
            }
        case LOGOUT:
            return{
                user:null,
                login: false
            }

    }
    return state;
}