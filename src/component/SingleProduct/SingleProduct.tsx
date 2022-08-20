import React, { useRef, useState, useEffect } from 'react'
import ProductConfig from '../../config/ProductConfig'
import styles from './SingleProduct.module.css'
import global_styles from '../../App.module.css'
import LazyLoad from 'react-lazyload'
import Preloader from '../Preloader/Preloader'
import { Link, useLocation } from "react-router-dom";

const SingleProduct = () => {

    const location = useLocation();
    const toFind = location.pathname.replace('/', '')

    const product = ProductConfig.find((o: any) => o.url === toFind);

    /* detect if uset decided to buy current product */
    const [choiceMade, setChoiceMade] = useState(false)

    /* show error when user tries to order product - for fun */
    const [showError, setShowError] = useState(false)

    /* ref to form element */
    const formRef = useRef<HTMLDivElement>(null)

    /* jump to produt page start */
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <div className={`${styles.one_selected_product} ${global_styles.auto_margin}`}>

                <div className={styles.one_selected_product_image}>
                    <LazyLoad height={250} resize={true} placeholder={<Preloader />}>
                        <img src={`/image/product/${product.image}`} alt=''></img>
                    </LazyLoad>
                </div>

                <div className={styles.one_selected_product_name}>{product.name}</div>

                <div className={styles.one_selected_product_text}>{product.text}</div>

                <div className={styles.one_selected_product_price}>{`cena: ${product.price} VC`}</div>

                {/* choiceMade = user selected product to buy */}
                {!choiceMade &&

                    <div className={styles.one_selected_product_buttons}>

                        <div className={styles.one_selected_product_button} onClick={() => setChoiceMade(true)}>To chci!</div>
                        <Link
                            to='/katalog'
                            className={styles.one_selected_product_button}
                        >
                            Zpět do katalogu</Link>

                    </div>
                }

                {/* if choice made by user, show order form */}
                {choiceMade &&
                    <div className={`${styles.form_holder} ${global_styles.auto_margin}`} ref={formRef}>

                        <div className={styles.one_selected_product_name}>Závazná objednávka</div>

                        <input className={styles.input} type={'text'} placeholder='Jméno a příjmení' name='name'></input>
                        <input className={styles.input} type={'text'} placeholder='Ulice, č.p.' name='address'></input>
                        <input className={styles.input} type={'text'} placeholder='Město' name='address'></input>
                        <input className={styles.input} type={'text'} placeholder='PSČ' name='zip'></input>
                        <input className={styles.input} type={'text'} placeholder='Stát' name='state'></input>

                        <div className={styles.not_required}>
                            {`Žádné z polí není povinné.
                                    Dokážeme Vás vystopovat podle IP adresy.`}
                        </div>

                        {!showError &&
                            <div className={styles.form_button} onClick={() => setShowError(true)}>Objednat</div>
                        }

                        {/* only as joke - form will never be sent */}
                        {showError &&
                            <div className={styles.error_message}>
                                Jejda, právě jsme ztratili Vaši objednávku!<br></br>
                                Nemá moc smysl to zkoušet znovu, dopadlo by to asi stejně.&nbsp;
                                <Link
                                    to='/katalog'
                                    className={styles.return_to_catalog}
                                >
                                    Raději se vraťte zpátky do katalogu
                                </Link>
                            </div>
                        }

                    </div>
                }

            </div>
        </>
    )

}

export default SingleProduct;