import React from 'react'
import Navigation from '../Navigation/Navigation'
import global_styles from '../../App.module.css'
import styles from './Header.module.css'


const Header = () => {

    return (
        <>
            <div className={global_styles.top_decorator}></div>

            <div className={`${global_styles.outer_wrapper} ${global_styles.auto_margin} ${styles.top}`}>

                <div className={`${global_styles.inner_wrapper} ${styles.header_wrapper} ${global_styles.auto_margin}`}>

                    <div className={global_styles.logo}></div>

                    <Navigation />

                </div>

            </div>
        </>
    )

}

export default Header;