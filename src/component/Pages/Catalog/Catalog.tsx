import React, { useState, useRef } from 'react'
import global_styles from '../../../App.module.css'
import styles from './Catalog.module.css'
import allProducts from '../../../config/ProductConfig'
import _orderBy from 'lodash/orderBy'
import Select from 'react-select'
import './ReactSelect.css'
import IProduct from '../../../config/IProduct'
import LazyLoad from 'react-lazyload'
import Preloader from '../../Preloader/Preloader'

/* The lazy loader is intentionally set to make the preloader visible. */

const Catalog = () => {

    /* load all products config */
    const initialProducts = _orderBy(allProducts, o => +o.price, ["desc"])

    /* store product selected by category */
    const [selectedProducts, setSelectedProducts] = useState(initialProducts)

    /* initial category */
    const [, setFilterBy] = useState('Vše')

    /* save filter type as state to re-render component */
    const [filter, setFilter] = useState<{ value: string, label: string }>()

    /* save order by as state to re-render component */
    const [orderBy, setOrderBy] = useState<{ value: string[], label: string }>()

    /* render single product if state undefined, or entire catalog otherwise */
    const [oneSelectedProduct, setOneSelectedProduct] = useState<undefined | IProduct>(undefined)

    /* detect if uset decided to buy current product */
    const [choiceMade, setChoiceMade] = useState(false)

    /* show error when user tries to order product - for fun */
    const [showError, setShowError] = useState(false)

    /* ref to form element */
    const formRef = useRef<HTMLDivElement>(null)

    /* sort by selected criteria from select component */
    const handleOrderBy = (e: { value: [string, ('asc' | 'desc')], label: string }): void => {

        const orderby = e.value[0]
        const orderDirection = e.value[1]

        let ordered: any

        if (typeof selectedProducts[0][orderby] === 'number') {
            ordered = _orderBy(selectedProducts, o => +o[orderby], [orderDirection])
        } else {
            ordered = _orderBy(selectedProducts, o => o[orderby], [orderDirection])
        }

        setOrderBy(e)
        setSelectedProducts(ordered)
    }

    /* filter by selected criteria from select component */
    const handleFilter = (e: { value: string, label: string }): void => {

        let filtered: any

        const category = e.value;

        if (category === 'Vše') {
            filtered = initialProducts
        } else {
            filtered = initialProducts.filter((product: any) => {
                return product.categories.includes(category)
            })
        }

        setFilter(e);
        setFilterBy(category)
        setSelectedProducts(filtered)
    }

    /* select one product from catalog */
    const handleSelectProduct = (id: number): void => {

        const productFound = initialProducts.find((product: any) => {
            return product.id === id
        })

        setOneSelectedProduct(productFound)
    }


    /* options for filter select */
    const filterOptions = [
        { value: 'Vše', label: 'Vše' },
        { value: 'Moře', label: 'Moře' },
        { value: 'Stromy', label: 'Stromy' },
        { value: 'Cesty', label: 'Cesty' },
        { value: 'Hory', label: 'Hory' },
        { value: 'Vodní hladiny', label: 'Vodní hladiny' },
        { value: 'Slunce', label: 'Slunce' },
        { value: 'Krajiny', label: 'Krajiny' },
    ]

    /* options for order by select */
    const orderByOptions = [
        { value: ['price', 'desc'], label: 'Nejvyšší ceny' },
        { value: ['price', 'asc'], label: 'Nejnižší ceny' },
        { value: ['popularity', 'desc'], label: 'Oblíbenosti' },
    ]

    return (
        <>

            <h1 className={styles.light}>Katalog</h1>

            {/* show select components in entire catalog mode only */}
            {(selectedProducts.length && !oneSelectedProduct) &&

                <div className={`${styles.selectors_container} ${global_styles.auto_margin}`}>

                    <div className={styles.label}>Téma</div>
                    <Select
                        className='select_element_container'
                        classNamePrefix='select_element'
                        options={filterOptions}
                        placeholder={null}
                        defaultValue={filterOptions[0]}
                        value={filter}
                        onChange={(e: any) => handleFilter(e)}
                        menuPortalTarget={document.body}
                    />

                    <div className={styles.label}>Řadit dle</div>
                    <Select
                        className='select_element_container'
                        classNamePrefix='select_element'
                        options={orderByOptions}
                        placeholder={null}
                        defaultValue={orderByOptions[0]}
                        value={orderBy}
                        onChange={(e: any) => handleOrderBy(e)}
                        menuPortalTarget={document.body}
                    />
                </div>
            }

            <div className={styles.price_info}>
                Veškeré ceny jsou uvedeny ve VeryniceCoins - VC (s&nbsp;jednoduchým&nbsp;V!)
                <br></br>
                Platby v jiných měnách nejsou akceptovány.
            </div>

            {/* show all product in entire catalog mode only */}
            {(selectedProducts.length && !oneSelectedProduct) &&

                <div className={styles.product_grid}>

                    {selectedProducts.map((product: any, index: number) => {

                        return (

                            <div className={styles.one_grid_product} key={index} data-id={product.id} onClick={(e: any) => handleSelectProduct(product.id)}>

                                <LazyLoad offset={-200} height={250} resize={true} placeholder={<Preloader />}>
                                    <img className={styles.overview_image} src={`/image/product/${product.image}`} alt=''></img>
                                </LazyLoad>

                                <div className={styles.overview_title}>{product.name}</div>

                                <div className={styles.overview_price}>{`cena: ${product.price} VC`}</div>

                            </div>
                        )
                    })}

                </div>
            }

            {/* show one selected product */}
            {oneSelectedProduct &&
                <>
                    <div className={`${styles.one_selected_product} ${global_styles.auto_margin}`}>

                        <div className={styles.one_selected_product_image}>
                            <LazyLoad offset={-200} height={250} resize={true} placeholder={<Preloader />}>
                                <img src={`/image/product/${oneSelectedProduct.image}`} alt=''></img>
                            </LazyLoad>
                        </div>

                        <div className={styles.one_selected_product_name}>{oneSelectedProduct.name}</div>

                        <div className={styles.one_selected_product_text}>{oneSelectedProduct.text}</div>

                        <div className={styles.one_selected_product_price}>{`cena: ${oneSelectedProduct.price} VC`}</div>

                        {/* choiceMade = user selected one product to buy */}
                        {!choiceMade &&

                            <div className={styles.one_selected_product_buttons}>

                                <div className={styles.one_selected_product_button} onClick={() => setChoiceMade(true)}>To chci!</div>
                                <div className={styles.one_selected_product_button} onClick={() => setOneSelectedProduct(undefined)}>Zpět do katalogu</div>

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
                                        Nemá moc smysl to zkoušet znovu, dopadlo by to asi stejně.
                                        <div className={styles.return_to_catalog}
                                            onClick={() => { setShowError(false); setChoiceMade(false); setOneSelectedProduct(undefined) }}
                                        >
                                            Raději se vraťte zpátky do katalogu
                                        </div>
                                    </div>
                                }

                            </div>
                        }

                    </div>
                </>
            }
        </>
    )
}

export default Catalog