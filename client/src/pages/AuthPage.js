import React, { useContext, useEffect, useState } from 'react'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })
    const message = useMessage()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    
    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const pressHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            message(data.message)
            auth.login(data.token, data.userId, data.isOrganizer)
        } catch (e) { }
    }

    if (loading) {
        return <Loader />
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card #ef6c00 orange darken-3">
                    <div className="card-content white-text">
                        <span className="center card-title"><b>Авторизация</b></span>
                        <div>
                            <div className="row">
                                <div className="input-field auth">
                                    <input
                                        placeholder="example@mail.ru" 
                                        id="email" 
                                        type="text" 
                                        name="email" 
                                        className="validate"
                                        onChange={changeHandler}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12 auth">
                                        <input 
                                            id="password" 
                                            type="password" 
                                            name="password" 
                                            className="validate"
                                            onChange={changeHandler}
                                        />
                                        <label htmlFor="password">Пароль</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn #3e2723 brown darken-4" onClick={pressHandler} >Войти</button>
                        <p></p>
                        <a className="btn #3e2723 brown darken-4" disabled={loading} href="/register">Зарегистрироваться как участник</a>
                        <p></p>
                        <a className="btn #3e2723 brown darken-4" disabled={loading} href="/special_register">Зарегистрироваться как организатор</a>
                    </div>
                </div>
            </div>
        </div>
    )
}