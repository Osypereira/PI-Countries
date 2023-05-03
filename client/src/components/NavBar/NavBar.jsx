import { Link } from "react-router-dom"
import style from "./NavBar.module.css"
import { useDispatch } from "react-redux";
import { getByName } from "../redux/actions";

const NavBar = () => {
    const dispatch = useDispatch()
    function handleChange(element) {
        dispatch(getByName(element.target.value))
    }

    return (
        <div className={style.mainContainer}>
            <Link to="/home">HOME</Link>
            <Link to="/create">FORM</Link>
            <form onChange={handleChange}>
                <input type="Search" />
            </form>
        </div>
    )
}

export default NavBar;