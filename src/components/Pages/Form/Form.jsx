import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCountries } from "../../../redux/actions"
import Header from "../../Header/Header"
import css from "./Form.module.css"
import validate from "./validate"
import img from "../../../assets/mapa.jpeg"
import home from "../../../assets/home.png"
import { Link } from "react-router-dom"

function Form(){

    const dispatch= useDispatch()

    useEffect(()=>{
        dispatch(getAllCountries())
    }, [])

    const countries = useSelector((state)=>state.countries)

    const [data, setData] = useState({
        name: "",
        difficulty: 0,
        duration: "",
        season: "",
        country: ""
    })

    const [cheked, setCheked] = useState(false)

    const handleCheked = ()=>{
        setCheked(cheked?false:true)
    }

    const handleData = (e)=>{
        if(e.target.name==="difficulty"){
           return setData({
            ...data, [e.target.name]: parseInt(e.target.value)
        }) 
        }else if(e.target.name==="country"){
            if (data.country.includes(e.target.value)){
                if (data.country.length===3) {
                    return setData({
                        ...data, [e.target.name]: data.country.replace(e.target.value, "")
                    })
                } else {
                    if (data.country.includes(`, ${e.target.value}`)) {
                        return setData({
                            ...data, [e.target.name]: data.country.replace(`, ${e.target.value}`, "")
                        })
                    } else if(data.country.includes(`${e.target.value}, `)){
                        return setData({
                            ...data, [e.target.name]: data.country.replace(`${e.target.value}, `, "")
                        })
                    }
                }
            } 
            else {
                if (data.country==="") {
                    return setData({
                        ...data, [e.target.name]: e.target.value
                    })
                } else {
                    return setData({
                        ...data, [e.target.name]: `${data.country}, ${e.target.value}`
                    })
                }
            }
        }
        setData({
            ...data, [e.target.name]: e.target.value
        })
        // setError(validate(data))
    }

    const [error, setError] = useState({
        // name: "",
        // difficulty: "",
        // duration: "",
        // season: "",
        // country: ""
    })

    const [errorSend, setErrorSend] = useState("")

    const sendData = (e)=>{
        e.preventDefault()
        const errors = validate(data); // Realizar la validación
        setError(errors);
        if (Object.keys(errors).length === 0) {
            console.log("listo para post")
            
            axios.post("http://localhost:3001/activities", data)
            .then((response)=>{
                setErrorSend(response.data)
                if(response.data==="actividad creada con exito"){
                    window.location.reload();
                }
            })
            .catch((error)=>{
                setErrorSend(error)
            })
        }else{
            console.log("completa los campos para crear actividad")
            setErrorSend("completa los campos para crear actividad")
        }
    } 
    // console.log(data)
// console.log(error)
    return(
        <div>
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
            <div className={css.conteiner}>
                
                <div className={css.divimg}>
                    <h3>
                        ¡crea tu proxima aventura!
                    </h3>
                    <img src={img} alt="" />
                </div>
                <div className={css.divForm}>
                    <form action="">
                        <label htmlFor="name">nombre: </label>
                        <p className={css.error}>{error.name}</p>
                        <input className={css.inputName} type="text" name="name" value={data.name} onChange={handleData}/>

                        <label htmlFor="difficulty">dificultad: <b>{data.difficulty}</b></label>
                        <p className={css.error}>{error.difficulty}</p>
                        <input className={css.inputRange} type="range" min="0" max="5" name="difficulty" value={data.difficulty} onChange={handleData}/>

                        <label htmlFor="duration">duracion en hs: <b>{data.duration}</b></label>
                        <p className={css.error}>{error.duration}</p>
                        <input className={css.inputDuration} type="number" min="0" max="10" name="duration" value={data.duration} onChange={handleData}/>

                        <label htmlFor="season">temporada: </label>
                        <p className={css.error}>{error.season}</p>
                        <select name="season" value={data.season} onChange={handleData}>
                            <option value="" disabled hidden >temporada</option>
                            <option value="verano">verano</option>
                            <option value="invierno">invierno</option>
                            <option value="otoño">otoño</option>
                            <option value="primavera">primavera</option>
                        </select>

                        <label htmlFor="">paises donde realizar: <b>{data.country}</b></label>
                        <p className={css.error}>{error.country}</p>
                        <div className={css.conteinerCheckbox}>
                            {countries.map((c)=>(
                                    <label className={css.labelCheckbox} htmlFor={c.name} key={c.name}>
                                        <input type="checkbox" name="country" id={c.id} value={c.id} onChange={handleData}/>
                                        {`${c.id} - ${c.name}`}
                                    </label>
                            ))}
                        </div>
                        <button onClick={sendData}>crear</button>
                        <p>{errorSend}</p>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Form