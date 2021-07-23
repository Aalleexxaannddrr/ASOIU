import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from '../components/Loader'
import { useHttp } from '../hooks/http.hook'
import Moment from 'moment'

export const StreamPage = () => {
    
    const { loading, request } = useHttp()
    const id = useParams().id
    const [competition, setCompetition] = useState('')

    const getInfo = useCallback(async () => {
        try {
            const fetched = await request(`/api/competition/${id}`, 'GET', null)
            setCompetition(fetched)
        } catch (e) { }
    }, [id, request])

    useEffect(() => {
        getInfo()
    }, [getInfo])

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <h3>{competition.name}</h3>
            <h5>Трансляция начнётся {Moment(competition.start).format("DD.MM.YYYY")}</h5>
        </div>
    )
}