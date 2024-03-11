import { Link, useParams } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react"
import {getActivitites, searchIdCountries} from "../../../redux/actions"
import css from "./Detail.module.css"
import Header from "../../Header/Header"
import home from "../../../assets/home.png"

function Detail(){

    const {id} = useParams()
    const countrie = useSelector((state)=>state.countries)
    const activities = useSelector((state)=>state.activities)
    const dispatch = useDispatch()

    const [activitiesCountries, setActivitiesCountries] = useState([])
    
    useEffect(()=>{
        dispatch(searchIdCountries(id))
        dispatch(getActivitites())
    },[])

    useEffect(() => {
        const filteredActivities = activities.filter(activity => {
            return activity.Countries.some(country => country.id.toUpperCase() === id.toUpperCase());
        });
        setActivitiesCountries(filteredActivities);
    }, [activities, id]);

    return(
        <div className={css.divDetail}>
            <Header/>
            <div className={css.divHome}>
            <div className={css.home}>
                <div>
                    <Link to="/home">
                    <img src={home} alt="home" />
                    <div>Home</div>
                    </Link>
                </div>
            </div>
            </div>
            {countrie.message ? (
                <p>{countrie.message}</p>
            ) : (
                <>
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
                    <div key={a.name} className={css.activities}>
                        <h4>{a.name}</h4>
                        <div>duracion: {a.duration} hs</div>
                        <div>dificultad: {a.difficulty}</div>
                        <div>temporada: {a.season}</div>
                    </div>
                )):(
                    <p>Este pais no tiene actividades</p>
                )}
            </div>
            </>
            )}
        </div>
    )
}
export default Detail