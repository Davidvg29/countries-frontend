import {ACTIVITIES_FILTER, CONTINENT_FILTER, GET_ACTIVITIES, GET_ALL_COUNTRIES, GET_CONTINENT, ORDER_ALFABETICAMENTE, ORDER_POPULATION, SEARCH_ID_COUNTRIES, SEARCH_NAME_COUNTRIES} from "./action-types"
import axios from "axios"

export const getAllCountries = ()=>async (dispatch)=>{
    try {
        const {data} = await axios("http://localhost:3001/countries")
        return dispatch({
            type: GET_ALL_COUNTRIES,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ALL_COUNTRIES,
            payload: "Ocurrio un error al obtener paises"
        })
        console.error("Ocurrio un error al obtener paises")
    }
}

export const searchNameCountries = (nameCountrie)=>async (dispatch)=>{
    try {
        const {data} = await axios(`http://localhost:3001/countries/name?name=${nameCountrie}`)
        dispatch({
            type: SEARCH_NAME_COUNTRIES,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SEARCH_NAME_COUNTRIES,
            payload: "ocurrio un error al buscar por nombre"
        })
        console.error("ocurrio un error al buscar por nombre")
    }
}

export const searchIdCountries = (id)=>async (dispatch)=>{
    try {
        const {data} = await axios(`http://localhost:3001/countries/${id}`)
        dispatch({
            type: SEARCH_ID_COUNTRIES,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SEARCH_ID_COUNTRIES,
            payload: "ocurrio un error al buscar por id"
        })
        console.error("ocurrio un error al buscar por id")
    }
}

export const getContinent = ()=>async (dispatch)=>{
    try {
        const {data} = await axios(`http://localhost:3001/continent`)
        dispatch({
            type: GET_CONTINENT,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_CONTINENT,
            payload: "ocurrio un error al obtener continentes"
        })
        console.error("ocurrio un error al obtener continentes")
    }
}

export const continentFilter = (continent)=>{
    return ({
        type: CONTINENT_FILTER,
        payload: continent
    })
}

export const getActivitites = ()=>async (dispatch)=>{
    try {
        const {data} = await axios(`http://localhost:3001/activities`)
        dispatch({
            type: GET_ACTIVITIES,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ACTIVITIES,
            payload: "ocurrio un error al obtener actividades"
        })
        console.error("ocurrio un error al obtener actividades")
    }
}

export const activitiefilter = (activitie)=>{
    return ({
        type: ACTIVITIES_FILTER,
        payload: activitie
    })
}

export const orderAlfbFilter = (order)=>{
    return ({
        type: ORDER_ALFABETICAMENTE,
        payload: order
    })
}

export const orderPopulation = (order)=>{
    return({
        type: ORDER_POPULATION,
        payload: order
    })
}