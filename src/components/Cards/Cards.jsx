import { Link } from "react-router-dom"
import css from "./Cards.module.css"

function Cards({countrie}) {


    return(
        <div className={css.conteinerCountrie}>
            <Link to={`/detail/${countrie.id}`}><img src={countrie.image} alt={countrie.name} /></Link>
            <div className={css.name}>{countrie.name}</div>
            <div className={css.continent}>{countrie.continent}</div>
        </div>
    )
}
export default Cards