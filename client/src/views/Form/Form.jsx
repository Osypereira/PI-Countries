import React, { useEffect, useState } from "react";// eslint-disable-line
import { useDispatch, useSelector } from "react-redux";// eslint-disable-line
import { getAllCountries, postActivities } from "../../components/redux/actions"; // 
import Style from "../Form/Form.module.css";  // eslint-disable-line




const Form = () => {

    const count = useSelector(state => state.countries)?.sort((a, z) => a.name.localeCompare(z.name))
        console.log(count)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCountries())
    }, [dispatch])

    const [form, setForm] = useState({
        name: "",
        dificulty: "",
        duration: "",
        season: "",
        countries: []
    })

    const [error, setError] = useState({})
//  ------------- handlers ---------------//
    
    const changeInputHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value

        setForm({ ...form, [property]: value })
        
    }

    const [names, setNames] = useState([])

    const selectCountryHandler = (event) => {
        if(!names.length || !names.find(countries => countries.id === event)){
        const countryMatch = count.find(item => item.id === event);
        setNames([...names, countryMatch]);

        setForm({
            ...form,
            countries: [...form.countries, event]
        })
      }

    }
    const selectDificultyHandler = (event) => {
        setForm({
            ...form,
            dificulty: Number(event.target.value)
        })
       
    }
    const selectDurationHandler = (event) => {
        setForm({
            ...form,
            duration: Number(event.target.value)
        })
     
    }
    const selectSeasonHandler = (event) => {
        setForm({
            ...form,
            season: event.target.value
        })
      
    }

    const deleteFlagHandler = (id) => {
        const filteredCountries = form.countries.filter(c => c !== id)
        setForm({ ...form, countries: filteredCountries })
        setNames(names.filter(c => c.id !== id))
    }


    // ---------------- submit ----------------//
    const handlerSubmit = (e) => {
         e.preventDefault();
        dispatch(postActivities(form))
        alert(`You have been created the new activity ${form.name}`)
        setForm({
            name: "",
            dificulty: null,
            duration: null,
            countries: [],
            season: "",
        })
    }

    const durationSelect = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
    const dificultySelect = [1, 2, 3, 4, 5]

    // ------------------ Validation -------------------//

    useEffect(() => {
        setError(validator(form))
    }, [form])

    const validator = (form) => {
        let errors = {}
        if (!form.name) {
            errors.name = 'Name is required'
        }
        if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(form.name)) {
            errors.name = 'Name is invalid'
        }
        if (!form.duration || form.duration < 1) {
            errors.duration = 'Duration is required'
        }
        if (!form.dificulty) {
            errors.dificulty = 'Dificulty is required'
        }
        if (!form.season) {
            errors.season = 'You must select one season'
        }
        if (!form.countries.length) {
            errors.countries = 'You must select at least one country'
        }
        return errors
    }

    


    return (
        <form className={Style.container} onSubmit={handlerSubmit}>
            <div>
                <div>
                    <label>NAME</label>
                   
                    <input placeholder="NAME IS REQUIRED" type="text" 
                           value={form.name} onChange={changeInputHandler} name="name"    
                        autoComplete="off" className={Style.box} />
                    {error.name && <span className={Style.Error}>{error.name}</span>}
                </div>
                    <span>DIFICULTY</span>
                <div>
                    <select className={Style.box} onChange={selectDificultyHandler}>
                        <option value="" hidden>-</option>
                        {dificultySelect.map(item => <option key={item} name="dificulty" value={item}>{item}</option>)}
                    </select>
                    {error.dificulty && <span className={Style.error}>{error.dificulty}</span>}
                </div>
                <span>DURATION</span>
                <div>
                    <select className={Style.box} onChange={selectDurationHandler}>
                        <option value="" hidden>-</option>
                        {durationSelect.map(item => <option key={item} name="duration" value={item}>{item}</option>)}
                    </select>
                    {error.duration && <span className={Style.error}>{error.duration}</span>}
                </div>
                <span>SEASON</span>
                <div>
                    <select className={Style.box} onChange={selectSeasonHandler}>
                        <option value="" hidden>-</option>
                        <option name="SUMMER" value="summer">SUMMER</option>
                        <option name="FALL" value="fall">FALL</option>
                        <option name="WINTER" value="winter">WINTER</option>
                        <option name="SPRING" value="spring">SPRING</option>
                        
                    </select>
                    {error.season && <span className={Style.error}>{error.season}</span>}
                </div>
                <label>COUNTRIES</label>
                <div>
                    <select className={Style.box} onChange={(e) => selectCountryHandler(e.target.value)}>
                        <option value="" hidden>-</option>
                        {count?.map(item => {
                           return (<option key={item.id} value={item.id}>{item.name.toUpperCase()}</option>)
                        })}
                    </select>
                    {error.countries && <span className={Style.error}>{error.countries}</span>}
                </div>
                <div className={Style.buttonContainer}>
                    {Object.entries(error).length === 0 &&
                        <button className={Style.button}
                            type="submit">ADD ACTIVITY
                        </button>}
                </div>

            </div>
            <div className={Style.countriesFlags}>
                {
                    names.map(country =>
                        <div key={country.id}>
                            <button className={Style.deleteButton}
                                onClick={() => deleteFlagHandler(country.id)}>x</button>
                            <img className={Style.flags} src={country.flagImage} alt={country.name}>
                            </img>
                        </div>
                    )
                }
            </div>

        </form>
    )
}

export default Form;