import classes from './Header.module.scss'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import { NavLink } from 'react-router-dom'


const Header = () => {
    return (
        <>

            <div className={classes.appHeader}>
                <div className={classes.routes}>
                    <NavLink to='/' className={({ isActive }) => isActive ? classes.activeHome : classes.homeLink}>
                        <div className='fas fa-house' style={{ fontSize: '24px' }}></div>
                        <div >Dashboard</div>
                    </NavLink>
                </div>
                <div className={classes.search}>
                    <NavLink to='/search' className={({ isActive }) => isActive ? classes.activeSearch : classes.searchLink} >
                        <div className='fas fa-magnifying-glass' style={{ fontSize: '24px' }}></div>
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