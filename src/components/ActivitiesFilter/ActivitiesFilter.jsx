import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { activitiefilter, getActivitites } from "../../redux/actions"
import css from "./ActivitiesFilter.module.css"

function ActivitiesFilter(){

    const dispatch = useDispatch()

    const activities = useSelector((state)=>state.activities)

    useEffect(()=>{
        dispatch(getActivitites())
    },[])

    const handleActivitie = (e)=>{
        
            dispatch(activitiefilter(e.target.value))            
        
    }
// console.log(activities)
    return (
        <div className={css.divActivitiesfilter}>
            <label htmlFor="">Actividad: </label>
            <select name="" id="" onChange={handleActivitie}>
            <option value="all">todos</option>
                {activities.map((a)=>(
                    <option key={a.name} value={JSON.stringify(a.Countries)}>{a.name}</option>
                ))}
            </select>
        </div>
    )
}
export default ActivitiesFilter