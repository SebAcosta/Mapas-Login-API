export const LOGIN = 'LOGIN';
export const LOGOUT = "LOGOUT"

export const tryLogin = (user, password) =>{
    if(user === "Huevito14" && password === "LecheAlpura1234"){
        return {
            type: LOGIN, //action.type  //payload
            user:user //action.user
        }
    }else{
        throw ("Usuario y/o Contraseña invalidos")
    }

}

export const logOut = () =>{
    return({
        type: LOGOUT,
    })
}

export const tryLoginServer = (user, password) =>{

    return async (dispatch) => {
        const response = await fetch(endpoint,{
            method:'GET'
        })
        const resData = await response.json();

        /*
            {
                validation:true o false
            }
         */


        if(resData.validation){
            dispatch({
                type: LOGIN, //action.type  //payload
                user:user //action.user
            })
        }else{
            throw ("Usuario y/o Contraseña invalidos")
        }

    }

}