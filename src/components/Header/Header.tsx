import classes from './Header.module.scss'

const Header = () => {
    return (
        <div className={classes.appHeader}>
            <div className={classes.routes}>
                <div>left</div>

            </div>
            <div className={classes.search}>
                <div>right</div>

            </div>

        </div>
    )
}

export default Header