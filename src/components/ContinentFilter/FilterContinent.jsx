import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getContinent, continentFilter } from "../../redux/actions"
import css from "./FilterContinent.module.css"

function ContinentFilter(){

    const continents = useSelector((state)=>state.continents)
    // const [continent, setContinent] = useState("")
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getContinent())
    },[])
    
    
    const handleContinent = (e)=>{
        // setContinent(e.target.value)
        dispatch(continentFilter(e.target.value))
        console.log(e.target.value)
    }
    
    // useEffect(()=>{
    //     dispatch(continentFilter(continent))
    // }, [continent])

// console.log(continent)

    return (
        <div className={css.divFilterContinent}>
            <label htmlFor="">continente:</label>
            <select name="" onChange={handleContinent}>
                <option value="all">todos</option>
                {continents.map((c)=>(
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
        </div>
    )
}
export default ContinentFilter