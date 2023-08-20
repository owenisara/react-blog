//เก็บข้อมูล token / username => session storage
export const autenticate=(response,next)=>{
    if(window !=="undifined"){
        //เก็บข้อมูล session storage
        sessionStorage.setItem("token",JSON.stringify(response.data.token) )
        sessionStorage.setItem("user",JSON.stringify(response.data.username) )
    }
    next()
}
//ดึงข้อมูล token
export const getToken=()=>{
    if(window !== "undifined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}
//ดึงข้อมูล User

export const getUser=()=>{
    if(window !== "undifined"){
        if(sessionStorage.getItem("user")){
            return JSON.parse(sessionStorage.getItem("user"))
        }else{
            return false
        }
    }
}

// logout

export const logout=(next)=>{
    if(window !== "undifined"){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
    }
    next()
}
