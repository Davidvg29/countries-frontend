import { useParams } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react"
import {getActivitites, searchIdCountries} from "../../../redux/actions"
import css from "./Detail.module.css"
import Header from "../../Header/Header"

function Detail(){

    const {id} = useParams()
    const countrie = useSelector((state)=>state.countries)
    const activities = useSelector((state)=>state.activities)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(searchIdCountries(id))
        dispatch(getActivitites())
    },[])

    let activitiesCountries = []

    for (let i = 0; i < activities.length; i++) {
        for (let j = 0; j < activities[i].Countries.length; j++) {
            if (activities[i].Countries[j].id===id) {
                activitiesCountries.push(activities[i])
            } 
        }   
    }

    // console.log(activitiesCountries)

    return(
        <div className={css.divDetail}>
            <Header/>
            <div className={css.divCaracteristicas}>
                <h2>{countrie.name}</h2>
                <div>Continente: {countrie.continent}</div>
                <img src={countrie.image} alt={countrie.name} />
                    <b>{countrie.id}</b>
                <div>
                    <div><b>Capital: </b>{countrie.capital}</div>
                    <div><b>Sub region: </b>{countrie.subregion}</div>
                    <div><b>Area: </b>{countrie.area}</div>
                    <div><b>Poblacion: </b>{countrie.population}</div>
                </div>
            </div>

            <div className={css.divActivites}>
                {activitiesCountries.length>0 ? 
                activitiesCountries.map((a)=>(
                    <div className={css.activities}>
                        <h4>{a.name}</h4>
                        <div>duracion: {a.duration} hs</div>
                        <div>dificultad: {a.difficulty}</div>
                        <div>temporada: {a.season}</div>
                    </div>
                )):(
                    <p>Este pais no tiene actividades</p>
                )}
            </div>

        </div>
    )
}
export default Detail