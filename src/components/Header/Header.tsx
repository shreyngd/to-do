import classes from './Header.module.scss'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const Header = () => {
    return (
        <>

            <div className={classes.appHeader}>
                <div className={classes.routes}>
                    <NavLink to='/' className={({ isActive }) => isActive ? classes.activeHome : classes.homeLink}>
                        <FontAwesomeIcon icon={faHouse} style={{ fontSize: '24px' }}></FontAwesomeIcon>
                        <div >Dashboard</div>
                    </NavLink>
                </div>
                <div className={classes.search}>
                    <NavLink to='/search' className={({ isActive }) => isActive ? classes.activeSearch : classes.searchLink} >
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '24px' }}></FontAwesomeIcon>
                    </NavLink>
                    <div className={classes.themeToggle}>
                        <ThemeToggle></ThemeToggle>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Header