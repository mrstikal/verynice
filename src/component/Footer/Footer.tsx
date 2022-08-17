import React, { useState } from 'react'
import global_styles from '../../App.module.css'
import styles from './Footer.module.css'
import Modal from '../Modal/Modal'

const Footer = () => {

    /* controlls modal state (opened/closed) */
    const [modalOpened, setModalOpened] = useState(false)

    return (
        <>
            <div className={`${global_styles.outer_wrapper} ${global_styles.auto_margin}`}>

                <div className={`${global_styles.inner_wrapper} ${styles.footer_wrapper} ${global_styles.auto_margin}`}>

                    <div className={global_styles.logo_footer} ></div>

                    <div className={styles.credit}>
                        &copy; ŽÁDNÁ PRÁVA VYHRAZENA<br></br>
                        <span onClick={() => setModalOpened(true)}>Více informací</span>
                    </div>

                </div>

            </div>

            <div className={global_styles.bottom_decorator}></div>

            {modalOpened && 
            <Modal
                heading='Opravdu. Žádná práva vyhrazena'
                text={
                    `
                    S tímto webem si můžete dělat co chcete.
                    Kopírovat, použít libovolné části webu, nebo klidně celý.
                    Ať je Váš život VeryNice!
                    `
                }
                closeHandler={setModalOpened}
            />
            }
        </>
    )
}

export default Footer;