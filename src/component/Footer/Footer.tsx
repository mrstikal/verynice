import React from 'react'
import global_styles from '../../App.module.css'
import styles from './Footer.module.css'


const Footer = () => {

    return (
        <>
            <div className={`${global_styles.outer_wrapper} ${global_styles.auto_margin}`}>

                <div className={`${global_styles.inner_wrapper} ${styles.footer_wrapper} ${global_styles.auto_margin}`}>

                    <div className={global_styles.logo_footer} ></div>

                    <div className={styles.credit}>
                        &copy; ŽÁDNÁ PRÁVA VYHRAZENA<br></br>
                        <span>Více informací</span>
                    </div>

                </div>

            </div>

            <div className={global_styles.bottom_decorator}></div>
        </>
    )
}

export default Footer;