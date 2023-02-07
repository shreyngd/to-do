import { useEffect, useState } from "react";
import { changeTheme, THEME } from "../../theme";
import classes from './ThemeToggle.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

const ThemeToggle = () => {
    const [theme, setTheme] = useState(THEME.DARK);
    useEffect(() => {
        changeTheme(THEME.DARK)
    }, [])
    const toggleTheme = () => {
        const newTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK
        setTheme(newTheme)
        changeTheme(newTheme)
    }
    return (<div className={classes.toggleContainer}>
        <input type="checkbox" className={classes.checkbox} id="checkbox" onChange={toggleTheme} checked={theme === THEME.DARK} />
        <label htmlFor="checkbox" className={classes.label}>
            <FontAwesomeIcon icon={faMoon} className={classes.icon}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faSun} className={classes.icon}></FontAwesomeIcon>
            <div className={classes.ball}></div>
        </label>
    </div>)
}

export default ThemeToggle