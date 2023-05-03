import Card from "../Card/Card"
import style from "./CardsContainer.module.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { getAllCountries, getAllActivities } from "../redux/actions"
import Paginado from "../Pagination/Paginado";

const CardsContainer = () => {
    
    
    const countries = useSelector(state => state.countries)
    console.log(countries)

    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.pag)
    const [countriesPerPage, setCountriesPerPage] = useState(10) // eslint-disable-line
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry)   // eslint-disable-line



    useEffect(() => {
        dispatch(getAllCountries())
        dispatch(getAllActivities())
    }, [dispatch])




//-----------------------------------------------------//

    return (
        <div>
<Paginado
countriesPerPage={countriesPerPage}
countries={countries.length}/>
        <div className={style.container}>
            {currentCountries?.map(country => {
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
            </div>
   )

}

export default CardsContainer