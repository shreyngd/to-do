import classes from './Header.module.scss'
import Hamburger from 'hamburger-react'
import { useState } from 'react'
import Drawer from 'react-modern-drawer'
import ThemeToggle from '../ThemeToggle/ThemeToggle'


const Header = () => {
    const [isOpen, setOpen] = useState(false)

    return (
        <>
            <Drawer
                open={isOpen}
                onClose={() => setOpen(false)}
                direction='left'
                className={classes.appDrawer}
                enableOverlay={false}
            >
                <div>Hello World</div>
            </Drawer>
            <div className={classes.appHeader}>
                <div className={classes.routes}>
                    <div>
                        <Hamburger toggled={isOpen} toggle={setOpen} size={20} />

                    </div>

                </div>
                <div className={classes.search}>
                    <ThemeToggle></ThemeToggle>

                </div>

            </div>
        </>
    )
}

export default Header