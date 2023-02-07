import classes from './Header.module.scss'
import ThemeToggle from '../ThemeToggle/ThemeToggle'


const Header = () => {
    return (
        <>

            <div className={classes.appHeader}>
                <div className={classes.routes}>


                </div>
                <div className={classes.search}>
                    <ThemeToggle></ThemeToggle>
                </div>

            </div>
        </>
    )
}

export default Header