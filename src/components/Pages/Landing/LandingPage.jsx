import { Link } from "react-router-dom"
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {getAllCountries} from "../../../redux/actions"
import css from "./LandingPage.module.css"
import Header from "../../Header/Header";
import img1 from "../../../assets/ball paises.webp"


function LandingPage(){

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllCountries())
    }, [])

    return (
        <div>
            <Header/>
            <div   className={css.divLanding}>
            <div className={css.divInfo}>
                <img src={img1} alt="" />
                <h3>Explora el mundo a través de sus banderas y descubre características de cada país. Planifica tus aventuras con actividades emocionantes. ¡Prepárate para una experiencia inolvidable!</h3>
            </div>
                    
                <Link to="/home">
                    <button>vamos!</button>
                </Link>
            </div>
        </div>
    )
}
export default LandingPage