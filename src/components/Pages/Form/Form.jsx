import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries, getActivitites } from "../../../redux/actions";
import Header from "../../Header/Header";
import css from "./Form.module.css";
import validate from "./validate";
import img from "../../../assets/mapa.jpeg";
import home from "../../../assets/home.png";
import { Link } from "react-router-dom";

function Form() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getActivitites())
    }, []);

    const [searchInputValue, setSearchInputValue] = useState("");

    const countriesRedux = useSelector((state) => state.countries);

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        setCountries(countriesRedux);
    }, [countriesRedux]);

    useEffect(() => {
        if (searchInputValue === "") {
            setCountries(countriesRedux);
        } else {
            let filterCountries = countriesRedux.filter((c) =>
                c.name.toUpperCase().includes(searchInputValue.toUpperCase())
            );
            setCountries(filterCountries);
        }
    }, [searchInputValue, countriesRedux]);

    const [data, setData] = useState({
        name: "",
        difficulty: 0,
        duration: "",
        season: "",
        country: ""
    });

    const [checkedCountries, setCheckedCountries] = useState([]);

    useEffect(() => {
        const selectedCountries = data.country.split(", ");
        setCheckedCountries(selectedCountries);
    }, [data.country]);

    const handleData = (e) => {
        if (e.target.name === "difficulty") {
            setData({
                ...data,
                [e.target.name]: parseInt(e.target.value)
            });
        } else if (e.target.name === "country") {
            const selectedCountry = e.target.value;
            let updatedCheckedCountries;

            if (checkedCountries.includes(selectedCountry)) {
                updatedCheckedCountries = checkedCountries.filter((country) => country !== selectedCountry);
            } else {
                updatedCheckedCountries = [...checkedCountries, selectedCountry];
            }

            setData({
                ...data,
                [e.target.name]: updatedCheckedCountries.join(", ")
            });
            setCheckedCountries(updatedCheckedCountries);
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            });
        }
    };

    const [error, setError] = useState({});

    const [errorSend, setErrorSend] = useState("");

    const sendData = (e) => {
        e.preventDefault();
        const errors = validate(data);
        setError(errors);
        if (Object.keys(errors).length === 0) {
            axios
                .post("http://localhost:3001/activities", data)
                .then((response) => {
                    setErrorSend(response.data);
                    if (response.data === "actividad creada con exito") {
                        window.location.reload();
                    }
                })
                .catch((error) => {
                    setErrorSend(error);
                });
        } else {
            setErrorSend("completa los campos para crear actividad");
        }
    };

    const searchInput = (e) => {
        setSearchInputValue(e.target.value);
    };



    const activities = useSelector((state)=>state.activities)

    console.log(activities)

    return (
        <div>
            <Header />
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
                    <h3>¡crea tu próxima aventura!</h3>
                    
                    <h5>tus actividades</h5>
                    <div className={css.divActivites}>
                    {activities.length>0 ? 
                    activities.map((a)=>(
                        <div key={a.name} className={css.activities}>
                            <h4>{a.name}</h4>
                            <div>duracion: {a.duration} hs</div>
                            <div>dificultad: {a.difficulty}</div>
                            <div>temporada: {a.season}</div>
                            <div>paises: {a.Countries.map((c)=>`${c.id}, `)}</div>
                        </div>
                    )):(
                        <p>no hay actividades</p>
                    )}
                </div>
                <img src={img} alt="" />
                </div>

                

                <div className={css.divForm}>
                    <form action="">
                        <label htmlFor="name">nombre: </label>
                        <p className={css.error}>{error.name}</p>
                        <input className={css.inputName} type="text" name="name" value={data.name} onChange={handleData} />

                        <label htmlFor="difficulty">
                            dificultad: <b>{data.difficulty}</b>
                        </label>
                        <p className={css.error}>{error.difficulty}</p>
                        <input className={css.inputRange} type="range" min="0" max="5" name="difficulty" value={data.difficulty} onChange={handleData} />

                        <label htmlFor="duration">
                            duracion en hs: <b>{data.duration}</b>
                        </label>
                        <p className={css.error}>{error.duration}</p>
                        <input className={css.inputDuration} type="number" min="0" max="10" name="duration" value={data.duration} onChange={handleData} />

                        <label htmlFor="season">temporada: </label>
                        <p className={css.error}>{error.season}</p>
                        <select name="season" value={data.season} onChange={handleData}>
                            <option value="" disabled hidden>
                                temporada
                            </option>
                            <option value="verano">verano</option>
                            <option value="invierno">invierno</option>
                            <option value="otoño">otoño</option>
                            <option value="primavera">primavera</option>
                        </select>

                        <label htmlFor="">paises donde realizar: <b>{data.country}</b></label>
                        <p className={css.error}>{error.country}</p>
                        <input type="text" placeholder="busca por nombre" onChange={searchInput} value={searchInputValue} />
                        <div className={css.conteinerCheckbox}>
                            {countries.map((c) => (
                                <label className={css.labelCheckbox} htmlFor={c.name} key={c.name}>
                                    <input
                                        type="checkbox"
                                        name="country"
                                        id={c.id}
                                        value={c.id}
                                        onChange={handleData}
                                        checked={checkedCountries.includes(c.id.toString())}
                                    />
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
    );
}

export default Form;
