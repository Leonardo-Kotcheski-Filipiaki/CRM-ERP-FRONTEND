import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Col, Container } from "react-bootstrap";
import { loginUser } from "../hooks/loginHook";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/loginSc.css';



function Login(){
    const { register, handleSubmit } = useForm();
    const [msgError, setMsgError] = useState('')
    const navigate = useNavigate();
    
    async function handleLoginData(data){
        await loginUser(data).then(res => {
            if(res === 'User not found'){ 
                setMsgError('Usuario ou senha incorretos');
                console.log(msgError)
            }else{
                sessionStorage.setItem('user', res.data.fullName);
            }
        }).catch((res) => {
        })

        if(sessionStorage.getItem('user') !== null && sessionStorage.getItem('user') !== undefined){
            navigate('/home');
        }
        
    }

    useEffect(() => {
        if(sessionStorage.getItem('user') !== null && sessionStorage.getItem('user') !== undefined){
            navigate('/home');
        }
    })


    return(
        <div className="background background-principal h-100">
            <Container className="w-100 h-100">
                <div className="w-100 h-100 d-flex justify-content-center flex-column ">
                    <div className="text-center mb-5 background background-tittle p-5 align-self-center">
                        <h1 id="page-title">Acesso</h1>
                    
                        <div className="error-div">
                            <h4 className="errorMsg position-absolute">{msgError}</h4>
                        </div>
                    
                    <form onSubmit={handleSubmit(handleLoginData)} className="text-center pt-5 align-items-center "> 
                        <Col className="m-2 d-flex justify-content-center">
                            <h4 id="login-input-text" className="login-input-title">Login:</h4>
                            <input id="login-input" className="input-login-page" type="text" placeholder="Insira seu login..." {...register('login')}/>
                        </Col>

                        <Col className="m-2 d-flex justify-content-center">
                            <h4 id="login-input-text" className="password-input-title">Senha:</h4>
                            <input id="password-input" className="input-login-page" type="password" placeholder="Insira sua senha..."  {...register('password')}/>
                        </Col>
                        <button className="form-submit-button">Enviar</button>
                    </form>   
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Login;