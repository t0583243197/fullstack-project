import React from 'react';
// import { useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "./authSlice";
import { Message } from 'primereact/message';

const Login = () => {
    const [login, { isError, isSuccess, error, data }] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const toastTopCenter = useRef(null);


    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    useEffect(() => {
        if (isSuccess) {
            // console.log("token:", data.accessToken)
            dispatch(setToken(data.accessToken))
            navigate("/products");
        }
    }, [isSuccess])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    }
    return (<>
        <div className="card">
            {isError &&<Message severity="error" text="משתמש לא מורשה" />
            }
            <form onSubmit={(e) => handleSubmit(e)} className="register-form">
            <div className="flex justify-content-center md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <InputText onChange={(e) => handleChange(e)} id="username" type="text" className="w-12rem" name='username' placeholder='Username' required />
                    </div>
                    <br></br>
                    <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                        <InputText onChange={(e) => handleChange(e)} id="password" type="password" className="w-12rem" name='password' placeholder='Password' required />
                    </div>
                    <br></br>
                    <Button type="submit" label="Login" icon="pi pi-user" className="w-10rem mx-auto"></Button>
                </div>
            </div>
            </form>
        </div>
    </>)
}
export default Login