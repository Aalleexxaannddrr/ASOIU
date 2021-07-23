import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Link, useHistory } from 'react-router-dom'
import Moment from 'moment'
import { AuthContext } from '../context/AuthContext'
import { useMessage } from '../hooks/message.hook'
import { Loader } from '../components/Loader'
import M from 'materialize-css'
import MaskedInput from 'react-maskedinput'
//import { Message, Icon } from 'semantic-ui-react'

export const CompetitionPage = () => {

    const history = useHistory()
    const auth = useContext(AuthContext)
    const [id, setId] = useState('')
    const { request, loading } = useHttp()
    const [competitions, setCompetitions] = useState([])
    const message = useMessage()
    let participants_id = []
    const [users, setUsers] = useState([])
    const [cardNumber, setCardNumber] = useState('')
    const [cardValid, setCardValid] = useState('')
    const [cardCVV, setCardCVV] = useState('')
    let card
    let valid
    let cvv
    // eslint-disable-next-line
    const [elem, setElem] = useState('')
    
    const getInfo = useCallback(async () => {
        try {
            const fetched = await request('/api/competition', 'GET', null)
            setCompetitions(fetched)
            const fetched2 = await request('/api/user', 'GET', null)
            setUsers(fetched2)
            const pricol = await auth.userId
            setId(pricol)
        } catch (e) { }
    }, [request, auth.userId])

    const initModal = () => {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }

    useEffect(() => {
        getInfo()
    }, [getInfo])

    useEffect(initModal)

    document.addEventListener('DOMContentLoaded', initModal)

    if (loading) {
        return <Loader />
    }

    const pressHandler = async (com) => {
        setCardNumber(card)
        setCardValid(valid)
        setCardCVV(cvv)
        card = ''
        const date = new Date()
        if (!auth.isAuthenticated) {
            message("❌ Для участия необходимо войти в систему")
            history.push('/auth')
        }
        if (auth.isOrganizer) {
            message("❌ Организатор не может участвовать")
        } else {
           participants_id = com.participants_id
            let q = false
            let w = false
            if (auth.isAuthenticated) {
                users.forEach(user => {
                if (user._id === auth.userId){
                    const date2 = Moment(user.birthday).format("YYYY")
                    const difference = date.getFullYear() - date2
                    if ((com.age_category === "14-18 лет" && (14 <= difference && difference <= 18))
                        || (com.age_category === "19-35 лет" && (19 <= difference && difference <= 35))
                        || (com.age_category === "старше 35 лет" && (35 <= difference))) {
                            (com.participants_id).forEach(participant_id => {
                                if (participant_id === user._id) {
                                message(" ❌ Вы уже подали заявку на участие в данном соревновании")
                                q = true
                            }
                        })
                        if (!q) {
                            participants_id.push(user._id)
                        }
                    } else {
                        message("❌ Вы не подходите по возрастной категории")
                        w = true
                    }
                }
            })

            if (!q && !w) {
                await request(`/api/competition/${com._id}`, 'PUT', { name: com.name, organizer_id: com.organizer_id, start: com.start, end: com.end, addres: com.addres, age_category: com.age_category, contribution: com.contribution, game_type: com.game_type, cover_type: com.cover_type, participants_id: participants_id })
                message("✔️ Участник был добавлен")
            }
        }
    }
    }

    const handleContrebutionClick = async(com, i) =>{
        var instance = M.Modal.getInstance(elem)
        const date = new Date()
        if (auth.isOrganizer) {
            message("❌ Организатор не может участвовать")
            setCardNumber('')
        }
        if (!auth.isAuthenticated) {
            message("❌ Для участия необходимо войти в систему")
            history.push('/auth')
        }
         else {
        participants_id = com.participants_id
        if (auth.isAuthenticated ) {
            users.forEach(user => {
                if (user._id === auth.userId){
                    const date2 = Moment(user.birthday).format("YYYY")
                    const difference = date.getFullYear() - date2
                    if ((com.age_category === "14-18 лет" && (14 <= difference && difference <= 18))
                        || (com.age_category === "19-35 лет" && (19 <= difference && difference <= 35))
                        || (com.age_category === "старше 35 лет" && (35 <= difference))) {
                        (com.participants_id).forEach(participant_id => {
                            if (participant_id === user._id) {
                                    message("❌ Вы уже подали заявку на участие в данном соревновании")
                                    setElem(document.querySelectorAll('.modal'))
                                    // instance.close()
                                }
                                
                            })
                        } else {
                            message("❌ Вы не подходите по возрастной категории")
                            setElem(document.querySelectorAll('.modal'))
                            // instance.close('.modal')
                        } if (((com.game_type === "Одиночная - женская" || com.game_type === "Парная - женская") && user.gender === "мужской") || 
                        ((com.game_type === "Одиночная - мужская" || com.game_type === "Парная - мужская") && user.gender === "женский")){
                            message("❌ Вы не подходите по половому признаку")
                            setElem(document.querySelectorAll('.modal'))
                            // instance.close('.modal')

                        }
                    }
                })
            }
        }
    }

    return (
        <>

            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            {auth.isOrganizer && <Link className="waves-effect waves-light btn #ef6c00 orange darken-3" to={`/competition_register/${id}`}>Организовать соревнование</Link>}
            <table>
                <thead>
                    <tr>
                        <th>Название соревнования</th>
                        <th>Начало соревнования</th>
                        <th>Окончание соревнования</th>
                        <th>Посмотреть подробную информацию</th>
                        <th>Подать заявление на участние</th>
                    </tr>
                </thead>

                <tbody>
                    {competitions.map((competition, i) => {
                        const data1 = Moment(competition.start).format("DD.MM.YYYY")
                        const data2 = Moment(competition.end).format("DD.MM.YYYY")
                        return (
                            <tr key={competition._id}>
                                <td>{competition.name}</td>
                                <td>{data1}</td>
                                <td>{data2}</td>
                                <td>{<Link className="waves-effect waves-light btn #3e2723 brown darken-4" to={`/competition_info/${competition._id}`}>Открыть информацию</Link>}</td>
                                <td>{<button data-target={`modal${i}`} className="btn modal-trigger waves-effect waves-light btn #e64a19 deep-orange darken-2" onClick={() => handleContrebutionClick(competition, i)}>Участвовать</button>}
                                    <div id={`modal${i}`} className="modal #ef6c00 orange darken-3">
                                        <div className="modal-content">
                                            <h4 className="center">Оплатить игровой взнос</h4>
                                            <p>Номер карты</p>
                                            <MaskedInput
                                                        id="phone_number"
                                                        type="tel"
                                                        mask="1111-1111-1111-1111"
                                                        value={cardNumber}
                                                        onChange={e => (card = e.target.value)}
                                                    />
                                            <div className="row">
                                                <div className="col s4">
                                                    <p>Срок действия</p>
                                                    <MaskedInput
                                                                id="phone_number"
                                                                type="tel"
                                                                mask="11/11"
                                                                value={cardValid}
                                                                onChange={e => (valid = e.target.value)}
                                                            />
                                                </div>
                                                <div className="col s4">
                                                    <p>CVC/CVV</p>
                                                    <MaskedInput
                                                                id="phone_number"
                                                                type="tel"
                                                                mask="111"
                                                                value={cardCVV}
                                                                onChange={e => (cvv = e.target.value)}
                                                            />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer #ef6c00 orange darken-3">
                                            <button className="modal-close waves-effect waves-light btn #3e2723 brown darken-4" onClick={() => pressHandler(competition)}>Оплатить {competition.contribution}</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
    
        </>
    )
}