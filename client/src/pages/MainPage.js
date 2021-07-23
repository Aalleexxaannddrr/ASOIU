import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Link } from 'react-router-dom'
import { Loader } from '../components/Loader'

export const MainPage = () => {
     
    var i = 0
    const [search, setSearch] = useState('')
    const {request, loading} = useHttp()
    const [competitions, setCompetitions] = useState([])

    const getCompetitions = useCallback(async () => {
        try {
            const fetched = await request('/api/competition', 'GET', null)
            const expandedFetchResult = []
            fetched.forEach(x => {
                expandedFetchResult.push({...x, visible: true})
            })

            setCompetitions(expandedFetchResult)
        } catch (e) { }
    }, [request])

    useEffect(() => {
        getCompetitions()
    }, [getCompetitions])

    const searchHandler = (e) => {
        const searchString = e.target.value.toLowerCase()
        setSearch(searchString)

        setCompetitions(
            competitions.map(x => {
                return {...x, visible: x.name.toLowerCase().includes(searchString)}
            })
        )
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
            <div className="special">
                <div className="fixed">
                    <div className="col s4">
                        <div className="input-field">
                            <input
                                placeholder="Поиск"
                                id="search"
                                type="search"
                                value={search}
                                onChange={e => searchHandler(e)}
                            />
                            <label className="label-icon lab" htmlFor="search">
                                <i className="material-icons">search</i>
                            </label>   
                        </div>
                    </div>
                    <div className="card #ef6c00 orange darken-3 float_card">
                        <div className="card-content white-text">
                            <span className="card-title">Ближайшие соревнования</span>
                                {
                                    competitions.slice(0, 3).map((x, i) => {
                                        return <Link key={i} className="card_link" to={`/competition_info/${x._id}`}>{x.name}<br/></Link>
                                    })
                                }
                            </div>
                            <div className="card-action">
                                <a className="btn #3e2723 brown darken-4" disabled={loading} href="/competition">Посмотреть все</a>
                            </div>
                        </div>
                    </div>
                </div>
                <h3>Прямые трансляции</h3>
                <div className="translations">
                <table>
                    <thead>
                        <tr>
                            <th>Название прямой трансляции</th>
                            <th className="broadcast_head">Смотреть трансляцию</th>
                        </tr>
                    </thead>
                    <tbody>
                        {competitions.filter(x => x.visible === true).map((competition) => {
                            return (
                                <tr key={competition._id}>
                                    <td>{competition.name}</td>
                                    <td>{
                                        <div className="broadcast">
                                            <a className="btn-floating btn-large waves-effect waves-light btn #3e2723 brown darken-4 translation_btn" href={`/stream/${competition._id}`}><i className="material-icons">play_arrow</i></a>
                                        </div>
                                    }</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}