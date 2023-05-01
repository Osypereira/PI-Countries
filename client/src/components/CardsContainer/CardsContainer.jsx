import Card from "../Card/Card"
import style from "./CardsContainer.module.css"
import { useSelector } from "react-redux"

const CardsContainer = () => {
    
    
    const countries = useSelector(state => state.countries)

    return (
        <div className={style.container}>
            {countries.map(country => {
                return <Card 
                    key={country.id}  
                    id={country.id}
                    imgflag={country.imgflag}
                    name={country.name}
                    continent={country.continent}
                    population={country.population}
                    activities={country.activities}
               />
           })}
       </div>
   )

}

export default CardsContainer