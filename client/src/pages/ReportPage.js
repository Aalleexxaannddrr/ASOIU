import React, { useCallback, useContext, useEffect, useState } from 'react'
import Moment from 'moment'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
const ReactHighcharts = require('react-highcharts')

export const ReportPage = () => {

    const auth = useContext(AuthContext)
    const [i, setI] = useState(false)
    const [age1, setAge1] = useState(0)
    const [age1_grass, setAgeGrass1] = useState(0)
    const [age1_hard, setAgeHard1] = useState(0)
    const [age1_priming, setAgePriming1] = useState(0)
    const [age1_carpet, setAgeCarpet1] = useState(0)
    const [age2, setAge2] = useState(0)
    const [age2_grass, setAgeGrass2] = useState(0)
    const [age2_hard, setAgeHard2] = useState(0)
    const [age2_priming, setAgePriming2] = useState(0)
    const [age2_carpet, setAgeCarpet2] = useState(0)
    const [age3, setAge3] = useState(0)
    const [age3_grass, setAgeGrass3] = useState(0)
    const [age3_hard, setAgeHard3] = useState(0)
    const [age3_priming, setAgePriming3] = useState(0)
    const [age3_carpet, setAgeCarpet3] = useState(0)
    const [age_check1, setAgeCheck1] = useState(0)
    const [age_check2, setAgeCheck2] = useState(0)
    const [age_check3, setAgeCheck3] = useState(0)
    const [type_check1, setTypeCheck1] = useState(false)
    const [type_check2, setTypeCheck2] = useState(false)
    const [type_check3, setTypeCheck3] = useState(false)
    const [type_check4, setTypeCheck4] = useState(false)
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [author, setAuthor] = useState('')
    const [competitions, setCompetitions] = useState([])
    const [user, setUser] = useState('')
    const { loading, request } = useHttp()

    const getInfo = useCallback(async () => {
        try {
            if (auth.isAuthenticated) {
                const fetched1 = await request(`/api/user/`, 'GET', null)
                setUser(fetched1)
            }
            const fetched2 = await request(`/api/competition/`, 'GET', null)
            setCompetitions(fetched2)
        } catch (e) { }
    }, [request, auth.isAuthenticated])

    useEffect(() => {
        getInfo()
    }, [getInfo])

    if (loading) {
        return <Loader />
    }

    const enableCheck = (from, to) => {
        if (from && to) {
            return (false)
        } else {
            return (true)
        }
    }

    let config1 = {
        title: {
            text: '???????????????????????? ?????????????????????? ???? ??????????'
        },
        chart: {
            polar: true,
            type: 'column',
          },
          series: [
            {
              name: '14-18 ??????',
              data: [age1_grass],
              pointPlacement: 'on',
              marker: {
                enabled: false
              },
              fillOpacity: 0.2,
              lineWidth: 1
            },
            {
              name: '19-35 ??????',
              data: [age2_grass],
              pointPlacement: 'on',
              marker: {
                enabled: false
              },
              fillOpacity: 0.2,
              lineWidth: 1
            },
            {
              name: '???????????? 35 ??????',
              data: [age3_grass],
              pointPlacement: 'on',
              marker: {
                enabled: false
              },
              fillOpacity: 0.2,
              lineWidth: 1
            }
          ],
        colors: ['#e64a19', '#C91B1B', '#3e2723']
    }

    let config2 = {
        title: {
            text: '???????????????????????? ?????????????????????? ???? ??????????'
        },
        chart: {
            polar: true,
            type: 'column',
          },
          series: [
            {
                name: '14-18 ??????',
                data: [age1_hard],
                pointPlacement: 'on',
                marker: {
                  enabled: false
                },
                fillOpacity: 0.2,
                lineWidth: 1
              },
              {
                name: '19-35 ??????',
                data: [age2_hard],
                pointPlacement: 'on',
                marker: {
                  enabled: false
                },
                fillOpacity: 0.2,
                lineWidth: 1
              },
              {
                name: '???????????? 35 ??????',
                data: [age3_hard],
                pointPlacement: 'on',
                marker: {
                  enabled: false
                },
                fillOpacity: 0.2,
                lineWidth: 1
              }
          ],
          colors: ['#e64a19', '#C91B1B', '#3e2723']
    }

    let config3 = {
        title: {
            text: '???????????????????????? ?????????????????????? ???? ????????????'
        },
        chart: {
            polar: true,
            type: 'column',
          },
          series: [
            {
                name: '14-18 ??????',
                data: [age1_priming],
                pointPlacement: 'on',
                marker: {
                  enabled: false
                },
                fillOpacity: 0.2,
                lineWidth: 1
              },
              {
                name: '19-35 ??????',
                data: [age2_priming],
                pointPlacement: 'on',
                marker: {
                  enabled: false
                },
                fillOpacity: 0.2,
                lineWidth: 1
              },
              {
                name: '???????????? 35 ??????',
                data: [age3_priming],
                pointPlacement: 'on',
                marker: {
                  enabled: false
                },
                fillOpacity: 0.2,
                lineWidth: 1
              }
          ],
          colors: ['#e64a19', '#C91B1B', '#3e2723']
    }

    let config4 = {
        title: {
            text: '???????????????????????? ?????????????????????? ???? ??????????'
        },
        chart: {
            polar: true,
            type: 'column',
          },
          series: [
            {
                name: '14-18 ??????',
                data: [age1_carpet],
                pointPlacement: 'on',
                marker: {
                  enabled: false
                },
                fillOpacity: 0.2,
                lineWidth: 1
              },
              {
                name: '19-35 ??????',
                data: [age2_carpet],
                pointPlacement: 'on',
                marker: {
                  enabled: false
                },
                fillOpacity: 0.2,
                lineWidth: 1
              },
              {
                name: '???????????? 35 ??????',
                data: [age3_carpet],
                pointPlacement: 'on',
                marker: {
                  enabled: false
                },
                fillOpacity: 0.2,
                lineWidth: 1
              }
          ],
          colors: ['#e64a19', '#C91B1B', '#3e2723']
    }

    const pressHandler = async => {
        setI(true)
        if (!auth.isAuthenticated){
            setAuthor("????????????????????????")
        } else {
            if (auth.isOrganizer) {
                user.forEach(organizer => {
                    if (organizer.email === user.email) {
                        setAuthor(organizer.name)
                    }
                })
            }
            if (!auth.isOrganizer) {
                user.forEach(participant => {
                    if (participant.email === user.email) {
                        setAuthor(participant.name)
                    }
                })
            }
        }
        competitions.forEach(competition => {
            if ((Moment(competition.start).isBetween(from, to, null, '()')) && (Moment(competition.end).isBetween(from, to, null, '()'))) {
            if (competition.age_category === "14-18 ??????") {
                setAge1(prev => prev + 1)
                if (competition.cover_type === "??????????") {
                    setAgeGrass1(prev => prev + competition.participants_id.length - 1)
                }
                if (competition.cover_type === "????????") {
                    setAgeHard1(prev => prev + competition.participants_id.length - 1)
                }
                if (competition.cover_type === "??????????") {
                    setAgePriming1(prev => prev + competition.participants_id.length - 1)
                }
                if (competition.cover_type === "??????????") {
                    setAgeCarpet1(prev => prev + competition.participants_id.length - 1)
                }
            }
            if (competition.age_category === "19-35 ??????") {
                setAge2(prev => prev + 1)
                if (competition.cover_type === "??????????") {
                    setAgeGrass2(prev => prev + competition.participants_id.length - 1)
                }
                if (competition.cover_type === "????????") {
                    setAgeHard2(prev => prev + competition.participants_id.length - 1)
                }
                if (competition.cover_type === "??????????") {
                    setAgePriming2(prev => prev + competition.participants_id.length - 1)
                }
                if (competition.cover_type === "??????????") {
                    setAgeCarpet2(prev => prev + competition.participants_id.length - 1)
                }
            }
                if (competition.age_category === "???????????? 35 ??????") {
                setAge3(prev => prev + 1)
                if (competition.cover_type === "??????????") {
                    setAgeGrass3(prev => prev + competition.participants_id.length - 1)
                }
                if (competition.cover_type === "????????") {
                    setAgeHard3(prev => prev + competition.participants_id.length - 1)
                }
                if (competition.cover_type === "??????????") {
                    setAgePriming3(prev => prev + competition.participants_id.length - 1)
                }
                if (competition.cover_type === "??????????") {
                    setAgeCarpet3(prev => prev + competition.participants_id.length - 1)
                }
            }
            }
        })
    }
    
        if (!i) {
            return (
                <div>
                    <h3>???????????? ???????????? ?? ???????????????????? ??????????????????????????</h3>
                    <div className="report-input">
                        <h5>c:</h5>
                        <input
                            placeholder="??"
                            id="from"
                            type="Date"
                            value={from}
                            onChange={e => setFrom(e.target.value)}
                        />
                        <h5>????:</h5>
                        <input
                            placeholder="????"
                            id="to"
                            type="Date"
                            value={to}
                            onChange={e => setTo(e.target.value)}
                        />
                    </div>
                    <h5>???????????????? ???????????????????? ??????????????????</h5>
                    <p>
                    <label>
                        <input type="checkbox" className="brown" onChange={ e => setAgeCheck1(e.target.checked) } />
                        <span>14-18 ??????</span>
                    </label>
                    </p>
                    <p>
                    <label>
                        <input type="checkbox" className="brown" onChange={ e => setAgeCheck2(e.target.checked) } />
                        <span>19-35 ??????</span>
                    </label>
                    </p>
                    <p>
                    <label>
                        <input type="checkbox" className="brown" onChange={ e => setAgeCheck3(e.target.checked) } />
                        <span>???????????? 35 ??????</span>
                    </label>
                    </p>
                    <h5>???????????????? ??????(??) ????????????????</h5>
                    <p>
                    <label>
                        <input type="checkbox" className="brown" onChange={ e => setTypeCheck1(e.target.checked) } />
                        <span>??????????</span>
                    </label>
                    </p>
                    <p>
                    <label>
                        <input type="checkbox" className="brown" onChange={ e => setTypeCheck2(e.target.checked) } />
                        <span>????????</span>
                    </label>
                    </p>
                    <p>
                    <label>
                        <input type="checkbox" className="brown" onChange={ e => setTypeCheck3(e.target.checked) } />
                        <span>??????????</span>
                    </label>
                    </p>
                    <p>
                    <label>
                        <input type="checkbox" className="brown" onChange={ e => setTypeCheck4(e.target.checked) } />
                        <span>??????????</span>
                    </label>
                    </p>
                    <button className="waves-effect waves-light btn #e64a19 deep-orange darken-2" onClick={pressHandler} disabled={enableCheck(from, to)}>???????????????????????? ??????????</button>
                </div>
            )
        }
    
        if (i) {
            return (
                <>
                    <div className="report">
                        <h5>?????????? ?? ?????????????????????????? ?????????????????????? ?? ????????????</h5>
                        <h5>c {Moment(from).format("DD.MM.YYYY")}??. ???? {Moment(to).format("DD.MM.YYYY")}</h5>
                    </div>
                    <p></p>
                    <p>?????????? ??????????????????:  {Moment(new Date()).format("DD.MM.YYYY")}??.</p>
                    <p>?????????? ????????????????:  {author}</p>
                    <p></p>
                    {age_check1 && age1 ? <p>???????? ?????????????????? {age1} ???????????????????????? ?? ???????????????????? ?????????????????? 14-18 ??????</p>: <></> }
                    {age_check2 && age2 ? <p>???????? ?????????????????? {age2} ???????????????????????? ?? ???????????????????? ?????????????????? 19-35 ??????</p>: <></> }
                    {age_check3 && age3 ? <p>???????? ?????????????????? {age3} ???????????????????????? ?? ???????????????????? ?????????????????? ???????????? 35 ??????</p>: <></> }
                    <table>
                    <thead>
                        <tr>
                            <th colSpan="3">?????????????? ???????? ?????????????????????? ???????????????????????? ?? ???????????????????????? ?????????? ???????????????? ?? ???????????????????? ???????????????????? </th>
                        </tr>
                    </thead>
    
                    <tbody>
                        <tr>
                            <td>???????????????? ????????????????????????</td>
                            <td>???????????????????? ??????????????????</td>
                            <td>?????? ????????????????</td>
                        </tr>
                        {
                                competitions.filter(competition => ((Moment(competition.start).isBetween(from, to, null, '()')) && (Moment(competition.end).isBetween(from, to, null, '()'))) &&
                                ((age_check1 && competition.age_category === "14-18 ??????")
                                || (age_check2 && competition.age_category === "19-35 ??????")
                                || (age_check3 && competition.age_category === "???????????? 35 ??????"))
                                && ((type_check1 && competition.cover_type === "??????????")
                                || (type_check2 && competition.cover_type === "????????")
                                || (type_check3 && competition.cover_type === "??????????")
                                || (type_check4 && competition.cover_type === "??????????"))).map((x, i) => {
                                            return (
                                                <tr key={x._id}>
                                                    <td>{x.name}</td>
                                                    <td>{x.age_category}</td>
                                                    <td>{x.cover_type}</td>
                                                </tr>
                                            )
                                })
                                }

                    </tbody>
                    </table>
                    <div className="flexContainer">
                        <div className="highchart">
                        {(type_check1 && (age1_grass || age2_grass || age3_grass)) ? <ReactHighcharts config={config1} />: <></>}                
                        </div>
                        <div className="highchart">
                        {(type_check2 && (age1_hard || age2_hard || age3_hard)) ? <ReactHighcharts config={config2} />: <></>}                
                        </div>
                        <div className="highchart">
                        {(type_check3 && (age1_priming || age2_priming || age3_priming)) ? <ReactHighcharts config={config3} />: <></>}                
                        </div>
                        <div className="highchart">
                        {(type_check4 && (age1_carpet || age2_carpet || age3_carpet)) ? <ReactHighcharts config={config4} />: <></>}                
                        </div>
                    </div>
                </>
            )
        }
}