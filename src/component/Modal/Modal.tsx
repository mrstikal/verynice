import React, { useState } from 'react'
import styles from './Modal.module.css'

interface IModal {
    heading: string,
    text: string,
    closeHandler: any
}

const Modal = (props: IModal) => {

    const {heading, text, closeHandler} = props

    return (
        <div className={styles.modal_wrapper} onClick={() => closeHandler(false)}>

            <div className={styles.modal_inner}>

                <div className={styles.modal_close}>&#x2715;</div>

                <div className={styles.modal_heading}>{heading}</div>

                <div className={styles.modal_text}>{text}</div>

            </div>

        </div>
    )

}

export default Modal;