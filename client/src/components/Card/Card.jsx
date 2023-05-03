import style from "./Card.module.css"
import { Link } from "react-router-dom"

const Card = (props) => {
    return (
        <div className={style.card}>
            <Link to={`/detail/$props{id}`}
            style={{textDecoration: "none", color: "red"}}
            >
            <img src={props.imgflag} alt="flag"/>
            <p>Name:{props.name}</p>
            <p>Continent:{props.continent}</p>
            <p>Poblacion:{props.poblacion}</p>
                <p>Activities:{props.activities.length && props.activities[0]?.name}</p>
            </Link>
        </div>
    )
}

export default Card;