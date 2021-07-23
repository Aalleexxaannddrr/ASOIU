import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import M from 'materialize-css'
import MaskedInput from 'react-maskedinput'

export const SpecialRegisterPage = () => {

    const auth = useContext(AuthContext)
    const message = useMessage()
    var years = []
    var [days, setDays] = useState([])
    var monthes = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    for (var i=1950; i<=2010; i++){
        years.push(i)
    }
    const [day, setDay] = useState('')
    const [month1, setMonth1] = useState('')
    const [year1, setYear1] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [gender, setGender] = useState('')
    const [passport_series, setPassportSeries] = useState('')
    const [passport_number, setPassportNumber] = useState('')
    const [phone_number, setPhoneNumber] = useState("9")
    const [password, setPassword] = useState('')
    const [password_check, setPasswordCheck] = useState('')
    const { loading, request, error, clearError } = useHttp()
    const isOrganizer = true 

    const initSelect = () => {
        const elems = document.querySelectorAll('select')
        M.FormSelect.init(elems)
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(initSelect)

    const pressHandler = async () => {
        try {
            var date = new Date()
            date.setFullYear(year1)
            date.setMonth(month1)
            date.setDate(day)
            setBirthday(date)
            if (password === password_check){
                const data = await request('/api/auth/register', 'POST', {email: email, password: password, isOrganizer: isOrganizer, name: name, birthday: birthday, passport_series: passport_series, passport_number: passport_number, phone_number: phone_number, gender: gender})
                message(data.message)
                const data1 = await request('/api/auth/login', 'POST', {email: email, password: password})
                message(data1.message)
                auth.login(data1.token, data1.userId, data1.isOrganizer)
            } else {
                window.M.toast({ html: "❌ Пароли не совпадают. Попробуйте снова." })
            }
        } catch (e) { }
    }

    if (loading) {
        return <Loader />
    }

    const enableCheck = (name, day, month1, year1, gender, passport_number, passport_series, phone_number, password, password_check, email) => {
        if (name && day && month1 && year1 && gender && passport_number && passport_series && phone_number && password && password_check && email && !loading) {
            return (false)
        } else {
            return (true)
        }
    }

    const setRightMonth = (month, year) => {
        setYear1(year)
        setDays([])
        if (month === "Январь" || month === 0) {
            setMonth1(0)
            for (var j=1; j<=31; j++){
                const qwe = j
                setDays(prev => {
                    return [...prev, qwe]
                })
            }
        }
        if (month === "Февраль" || month === 1) {
            if ((year % 4) === 0) {
                for (var s=1; s<=29; s++){
                    const qwe = s
                    setDays(prev => {
                        return [...prev, qwe]
                    })
                }
            } else {
                for (var d=1; d<=28; d++){
                    const qwe = d
                    setDays(prev => {
                        return [...prev, qwe]
                    })
                }
            }
            setMonth1(1)
        }
        if (month === "Март" || month === 2) {
            setMonth1(2)
            for (var q=1; q<=31; q++){
                const qwe = q
                setDays(prev => {
                    return [...prev, qwe]
                })
            }
        }
        if (month === "Апрель" || month === 3) {
            setMonth1(3)
            for (var w=1; w<=30; w++){
                const qwe = w
                setDays(prev => {
                    return [...prev, qwe]
                })
            }
        }
        if (month === "Май" || month === 4) {
            setMonth1(4)
            for (var e=1; e<=31; e++){
                const qwe = e
                setDays(prev => {
                    return [...prev, qwe]
                })
            }
        }
        if (month === "Июнь" || month === 5) {
            setMonth1(5)
            for (var r=1; r<=30; r++){
                const qwe = r
                setDays(prev => {
                    return [...prev, qwe]
                })
            }
        }
        if (month === "Июль" || month === 6) {
            setMonth1(6)
            for (var t=1; t<=31; t++){
                const qwe = t
                setDays(prev => {
                    return [...prev, qwe]
                })
            }
        }
        if (month === "Август" || month === 7) {
            setMonth1(7)
            for (var y=1; y<=31; y++){
                const qwe = y
                setDays(prev => {
                    return [...prev, qwe]
                })
            }
        }
        if (month === "Сентябрь" || month === 8) {
            setMonth1(8)
            for (var u=1; u<=30; u++){
                const qwe = u
                setDays(prev => {
                    return [...prev, qwe]
                })
            }
        }
        if (month === "Октябрь" || month === 9) {
            setMonth1(9)
            for (var o=1; o<=31; o++){
                const qwe = o
                setDays(prev => {
                    return [...prev, qwe]
                })
            }
        }
        if (month === "Ноябрь" || month === 10) {
            setMonth1(10)
            for (var p=1; p<=30; p++){
                const qwe = p
                setDays(prev => {
                    return [...prev, qwe]
                })
            }
        }
        if (month === "Декабрь" || month === 11) {
            setMonth1(11)
            for (var a=1; a<=31; a++){
                const qwe = a
                setDays(prev => {
                    return [...prev, qwe]
                })
            }
        }
    }

    document.addEventListener('DOMContentLoaded', initSelect)

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="register-input-field">
                    <p>ФИО</p>
                    <input
                        placeholder="ФИО"
                        id="FIO"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <p>Дата рождения</p>
                    <div className="col s4">
                    <select
                        onChange={e => setRightMonth(month1, e.target.value)}>
                        <option value="">Год</option>
                        {years.map((year, i) => {
                            return (
                                <option key={i} value={year}>{year}</option>
                            )
                        })}
                    </select>
                    </div>
                    <div className="col s4">
                    <select
                        onChange={e => setRightMonth((e.target.value), year1)}>
                        <option value="">Месяц</option>
                        {monthes.map((month, i) => {
                            return (
                                <option key={i} value={month}>{month}</option>
                            )
                        })}
                    </select>
                    </div>
                    <div className="col s4">
                    <select
                        onChange={e => setDay(e.target.value)}>
                        <option value="" >День</option>
                        {days.map((day, i) => {
                            return (
                                <option key={i} value={day}>{day}</option>
                            )
                        })}
                    </select>
                    </div>
                    <p>Ваш пол</p>
                    <select className="browser-default"
                        onChange={e => setGender(e.target.value)}>
                        <option value="" >Пол</option>
                        <option value="мужской">мужской</option>    
                        <option value="женский">женский</option>    
                          </select>
                    <p>Серия паспорта</p>
                    <MaskedInput
                        id="passwort_series"
                        mask="1111"
                        value={passport_series}
                        onChange={e => setPassportSeries(e.target.value)}
                    />
                    <p>Номер паспорта</p>
                    <MaskedInput
                        id="passwort_number"
                        mask="111-111"
                        value={passport_number}
                        onChange={e => setPassportNumber(e.target.value)}
                    />
                    <p>Номер телефона</p>
                    <MaskedInput
                        placeholder="example@mail.ru"
                        id="phone_number"
                        type="tel"
                        mask="+7 (111) 111-11-11"
                        maskPlaceholder="-"
                        value={phone_number}
                        onChange={e => setPhoneNumber(e.target.value)}
                    />
                    <p>Email</p>
                    <input
                        placeholder="Email"
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <p>Пароль</p>
                    <input
                        placeholder="Пароль"
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <p>Повторите пароль</p>
                    <input
                        placeholder="Повторите пароль"
                        id="password"
                        type="password"
                        value={password_check}
                        onChange={e => setPasswordCheck(e.target.value)}
                    />
                </div>
                <button className="waves-effect waves-light btn #e64a19 deep-orange darken-2" onClick={pressHandler} disabled={enableCheck(name, day, month1, year1, passport_number, passport_series, email, phone_number, password, password_check, gender)}>Зарегистрироваться</button>
            </div>
        </div>
    )
}