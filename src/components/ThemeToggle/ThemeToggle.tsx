import { useState } from "react";
import { changeTheme, THEME } from "../../theme";
import classes from './ThemeToggle.module.scss'

const ThemeToggle = () => {
    const [theme, setTheme] = useState(THEME.DARK);
    const toggleTheme = () => {
        const newTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK
        setTheme(newTheme)
        changeTheme(newTheme)
    }
    return (<div className={classes.toggleContainer}>
        <input type="checkbox" className={classes.checkbox} id="checkbox" onChange={toggleTheme} checked={theme === THEME.DARK} />
        <label htmlFor="checkbox" className={classes.label}>
            <i className="fas fa-moon"></i>
            <i className='fas fa-sun'></i>
            <div className={classes.ball}></div>
        </label>
    </div>)
}

export default ThemeToggle