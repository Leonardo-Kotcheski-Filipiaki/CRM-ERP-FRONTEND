import axios from "axios"

export async function loginUser(data){
    return await axios.post('http://127.0.0.1:2000/user/login', {
        login: data.login,
        password: data.password
    }).then(res => {
        return res;
    }).catch(err => {
        if(err.status === 404){
            if(err.request.responseText === "User not found"){
                return err.request.responseText;
            }
        }
    })
}

