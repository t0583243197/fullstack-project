import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useRegisterFuncMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Register = () => {
    const [register, { isError, isSuccess, error, isLoading }] = useRegisterFuncMutation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: '',
        phone: ''
    })
    useEffect(() => {
        if (isSuccess) {
            navigate("/login")
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
        register(formData)
    }
    return (
        <form onSubmit={(e) => handleSubmit(e)} className="register-form">
            {isError && JSON.stringify(error)}
            <div className="card" >
                <div className="flex justify-content-center md:flex-row">
                    <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <InputText onChange={(e) => handleChange(e)} id="username" required type="text" className="w-12rem" name='username'placeholder='Username' />
                        </div>
                        <br></br>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <InputText onChange={(e) => handleChange(e)} id="username" required type="text" className="w-12rem" name='name'placeholder='name' />
                        </div>
                        <br></br>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <InputText onChange={(e) => handleChange(e)} id="username" required type="text" className="w-12rem" name='phone'placeholder='phone' />
                        </div>
                        <br></br>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <InputText onChange={(e) => handleChange(e)} id="username" required type="email" className="w-12rem" name='email'placeholder='email' />
                        </div>
                        <br></br>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <InputText onChange={(e) => handleChange(e)} id="password" required type="password" className="w-12rem" name='password'placeholder='password' />
                        </div>
                        <br></br>
                        <Button type="submit" label="register" icon="pi pi-user" className="w-10rem mx-auto"></Button>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default Register