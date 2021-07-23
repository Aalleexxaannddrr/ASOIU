import React, { useState, useCallback, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useHistory } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useMessage } from '../hooks/message.hook'

export const CompetitionRegisterPage = () => {

    const history = useHistory()
    const auth = useContext(AuthContext)
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [addres, setAddres] = useState('')
    const [age_category, setAgeCatecory] = useState('')
    const [contribution, setContribution] = useState('')
    const [game_type, setGameType] = useState('')
    const [cover_type, setCoverType] = useState('')
    const participants_id = [""]
    const { loading, request } = useHttp()
    const message = useMessage()

    const getInfo = useCallback(async () => {
        try {
            const pricol = await auth.userId
            setId(pricol)
        } catch (e) { }
    }, [auth.userId])

    useEffect(() => {
        getInfo()
    }, [getInfo])

    const pressHandler = async () => {
        try {
            await request('/api/competition/add', 'POST', { name: name, start: start, end: end, addres: addres, age_category: age_category, contribution: contribution, game_type: game_type, cover_type: cover_type, participants_id: participants_id, organizer_id: id})
            history.push('/competition')
            message("✔️ соревнование успешно добавлено")
        } catch (e) { }
    }
    
    if (loading) {
        return <Loader />
    }

    const enableCheck = (name, start, end, addres, age_category, contribution, game_type, cover_type) => {
        if (name && start && end && addres && age_category && contribution && game_type && cover_type && !loading) {
            return (false)
        } else {
            return (true)
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="register-input-field">
                    <p>Название соревнований</p>
                    <input
                        placeholder="Название соревнований"
                        id="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <p>Период проведения</p>
                    <p>с</p>
                    <input
                        placeholder="Начало соревнований"
                        id="start"
                        type="Date"
                        value={start}
                        onChange={e => setStart(e.target.value)}
                    />
                    <p>по</p>
                    <input
                        placeholder="Конец соревнований"
                        id="end"
                        type="Date"
                        value={end}
                        onChange={e => setEnd(e.target.value)}
                    />
                    <p>Адрес проведения</p>
                    <input
                        placeholder="Адрес проведения"
                        id="addres"
                        type="text"
                        value={addres}
                        onChange={e => setAddres(e.target.value)}
                    />
                    <p>Возрастная категория</p>
                    <select className="browser-default"
                        onChange={e => setAgeCatecory(e.target.value)}>
                        <option value="" >Возрастная категория</option>
                        <option value="14-18 лет">14-18 лет</option>    
                        <option value="19-35 лет">19-35 лет</option>    
                        <option value="старше 35 лет">старше 35 лет</option>    
                    </select>
                    <p>Взнос</p>
                    <input
                        placeholder="Взнос"
                        id="contribution"
                        type="number"
                        value={contribution}
                        onChange={e => setContribution(e.target.value)}
                    />
                    <p>Тип игры</p>
                    <select className="browser-default"
                        onChange={e => setGameType(e.target.value)}>
                        <option value="" >Тип игры</option>
                        <option value="Одиночная - женская">Одиночная - женская</option>    
                        <option value="Одиночная - мужская">Одиночная - мужская</option>    
                        <option value="Парная - женская">Парная - женская</option>    
                        <option value="Парная - мужская">Парная - мужская</option>    
                    </select>
                    <p>Тип покрытия</p>
                    <select className="browser-default"
                        onChange={e => setCoverType(e.target.value)}>
                        <option value="" >Тип покрытия</option>
                        <option value="Трава">Трава</option>    
                        <option value="Хард">Хард</option>    
                        <option value="Грунт">Грунт</option>    
                        <option value="Ковер">Ковер</option>    
                    </select>
                </div>
                <button className="waves-effect waves-light btn #e64a19 deep-orange darken-2" onClick={pressHandler} disabled={enableCheck(name, start, end, addres, age_category, contribution, game_type, cover_type)}>Опубликовать</button>
            </div>
        </div>
    )
}