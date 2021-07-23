import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import Moment from 'moment'

export const CompetitionInfoPage = () => {
    
    let i = 0
    const id = useParams().id
    const [competition, setCompetition] = useState('')
    const [participants, setParticipants] = useState([])
    const { loading, request } = useHttp()
    const history = useHistory()

    const getInfo = useCallback(async () => {
        try {
            const fetched = await request(`/api/competition/${id}`, 'GET', null)
            setCompetition(fetched)
            const fetched3 = await request(`/api/user/`, 'GET', null)
            setParticipants(fetched3)
        } catch (e) { }
    }, [id, request])

    useEffect(() => {
        getInfo()
    }, [getInfo])

    const pressHandler = event => {
        history.push('/competition')
    }

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <h3>{competition.name}</h3>
            <table style={{ width: 500 }}>
                <tbody>
            <tr>
                <td><p><b>Начало соревнования:</b></p></td>
                <td> {Moment(competition.start).format("DD.MM.YYYY")}</td>
            </tr>
            <tr>
                <td><p><b>Окончание соревнования:</b></p></td>
                <td>{Moment(competition.end).format("DD.MM.YYYY")}</td>
                </tr>
            <tr>
                <td><p><b>Адрес проведения:</b></p></td>
                 <td>{competition.addres}</td>
            </tr>
            <tr>
                <td><p><b>Возрастная категория:</b></p></td>
                <td>{competition.age_category}</td>
                </tr>
            <tr>
                <td><p><b>Взнос:</b></p></td>
                <td> {competition.contribution}</td>
                </tr>
            <tr>
                <td><p><b>Тип игры:</b></p></td>
                <td> {competition.game_type}</td>
            </tr>
            <tr>
                 <td><p><b>Тип покрытия:</b></p></td>
                 <td> {competition.cover_type}</td>
                 </tr>
            </tbody>
            </table>
            <p><b>Список участников:</b></p>
            {participants.map(pretendent => {
                let j = ''
                let qwe 
                (competition.participants_id).forEach(participant_id => {
                    if (participant_id === pretendent._id) {
                        qwe = pretendent.name
                        i++
                        j = i + '. '
                    }
                })
                return (
                    <p key={pretendent._id}>{ j }{qwe}</p>
                )
            })}
            <button className="waves-effect waves-light btn #3e2723 brown darken-4" onClick={() => pressHandler()}>Вернуться к списку соревнований</button>
        </>
    )
}