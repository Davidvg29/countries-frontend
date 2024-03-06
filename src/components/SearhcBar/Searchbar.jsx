import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import {searchNameCountries} from "../../redux/actions"
import css from "./Searchbar.module.css"

function SearchBar(){

    const [nameCountrie, setNameCountrie] = useState("")

    const dispatch = useDispatch()

    const handlerInput = (e)=>{
        setNameCountrie(e.target.value)
    }

    const searchCountrie = ()=>{
        console.log(nameCountrie)
        dispatch(searchNameCountries(nameCountrie))
    }           

    return (
        <div className={css.divSearchbar}>
            <input value={nameCountrie} onChange={handlerInput} type="text" placeholder="buscar por nombre de pais"/>
            <button onClick={searchCountrie}>buscar</button>
        </div>
    )
}
export default SearchBar