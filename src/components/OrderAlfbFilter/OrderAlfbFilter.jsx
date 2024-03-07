import { useDispatch } from "react-redux"
import { orderAlfbFilter } from "../../redux/actions"
import css from "./OrderAlfbFilter.module.css"

function OrderAlfbFilter(){

    const dispatch = useDispatch()

    const handlerOrder = (e)=>{
        dispatch(orderAlfbFilter(e.target.value))
    }

    return(
        <div className={css.divOrderAlfbFilter}>
            <label htmlFor="">alfabeticamente: </label>
            <select name="" id="" onChange={handlerOrder}>
                <option value="default" hidden>default</option>
                <option value="asc">A-Z</option>
                <option value="des">Z-A</option>
            </select>
            
        </div>
    )
}
export default OrderAlfbFilter