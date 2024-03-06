import { useDispatch } from "react-redux"
import { orderPopulation } from "../../redux/actions"
import css from "./OrderPopulationFilter.module.css"

function OrderPopulationFilter(){

    const dispatch = useDispatch()

    const handlerOrder = (e)=>{
        dispatch(orderPopulation(e.target.value))
    }

    return(
    <div className={css.divOrderPopulationFilter}>
        <label htmlFor="">poblacion: </label>
        <select name="" id="" onChange={handlerOrder}>
            <option value="default">default</option>
            <option value="mayor">mayor</option>
            <option value="menor">menor</option>
        </select>
    </div>
    )
}
export default OrderPopulationFilter