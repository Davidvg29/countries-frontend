import { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import { getAllCountries } from "../../../redux/actions"
import ActivitiesFilter from "../../ActivitiesFilter/ActivitiesFilter"
import Card from "../../Card/Card"
import ContinentFilter from "../../ContinentFilter/FilterContinent"
import OrderAlfbFilter from "../../OrderAlfbFilter/OrderAlfbFilter"
import OrderPopulationFilter from "../../OrderPopuationFilter/OrderPopulationFilter"
import SearchBar from "../../SearhcBar/Searchbar"
import {Link} from "react-router-dom"
import css from "./Home.module.css"
import Header from "../../Header/Header"
import img from "../../../assets/ball paises.webp"

function Home(){

    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getAllCountries())
    },[])
    
    // const countries = useSelector((state)=>state.countries)
    const copyCountries = useSelector((state)=>state.copyCountries)
    // console.log(countries)
    // console.log(copyCountries)
    return(
        <div className={css.conteinerHome}>
            <Header/>
            <div className={css.conteinerMenu}>
                <div className={css.divMenu}>
                    <div className={css.titleFilter}>filtros</div>
                    <SearchBar/>
                    <div className={css.filter}>
                        <ContinentFilter/>
                        <ActivitiesFilter/>
                        <OrderAlfbFilter/>
                        <OrderPopulationFilter/>
                    </div>
                    <div className={css.img}>
                        <img src={img} alt="" />
                    </div>
                    <div className={css.divButtonActivitie}>
                        ¡no olvides tu aventura!
                        <Link to="/form"><button>crear actividad</button></Link>
                    </div>
                    
                </div>
                <div className={css.divCard}>
                    <Card countries={copyCountries}/>
                </div>
            </div>
        </div>
    )
}
export default Home