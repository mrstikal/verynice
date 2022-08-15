import React, { useState, useRef } from 'react'
import global_styles from '../../../App.module.css'
import styles from './Catalog.module.css'
import allProducts from '../../../config/ProductConfig'
import _orderBy from 'lodash/orderBy'
import Select from 'react-select'
import './ReactSelect.css'
import IProduct from '../../../config/IProduct';


const Catalog = () => {

    const initialProducts = _orderBy(allProducts, o => +o.price, ["desc"])

    const [selectedProducts, setSelectedProducts] = useState(initialProducts)

    const [, setFilterBy] = useState('Vše')

    const [filter, setFilter] = useState()

    const [orderBy, setOrderBy] = useState()

    const [oneSelectedProduct, setOneSelectedProduct] = useState<undefined | IProduct>(undefined)

    const [choiceMade, setChoiceMade] = useState(false)

    const [showError, setShowError] = useState(false)

    const formRef = useRef<HTMLDivElement>(null)

    const handleOrderBy = (e: any) => {

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

    const handleFilter = (e: any) => {

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

    const handleSelectProduct = (id: number) => {

        const productFound = initialProducts.find((product: any) => {
            return product.id === id
        })

        setOneSelectedProduct(productFound)
    }


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

    const orderByOptions = [
        { value: ['price', 'desc'], label: 'Nejvyšší ceny' },
        { value: ['price', 'asc'], label: 'Nejnižší ceny' },
        { value: ['popularity', 'desc'], label: 'Oblíbenosti' },
    ]

    return (
        <>

            <h1 className={styles.light}>Katalog</h1>

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

            {(selectedProducts.length && !oneSelectedProduct) &&

                <div className={styles.product_grid}>

                    {selectedProducts.map((product: any, index: number) => {

                        return (

                            <div className={styles.one_grid_product} key={index} data-id={product.id} onClick={(e: any) => handleSelectProduct(product.id)}>

                                <img className={styles.overview_image} src={`/image/product/${product.image}`} alt=''></img>

                                <div className={styles.overview_title}>{product.name}</div>

                                <div className={styles.overview_price}>{`cena: ${product.price} VC`}</div>

                            </div>
                        )
                    })}

                </div>
            }

            {oneSelectedProduct &&
                <>
                    <div className={`${styles.one_selected_product} ${global_styles.auto_margin}`}>

                        <div className={styles.one_selected_product_image}>
                            <img src={`/image/product/${oneSelectedProduct.image}`} alt=''></img>
                        </div>

                        <div className={styles.one_selected_product_name}>{oneSelectedProduct.name}</div>

                        <div className={styles.one_selected_product_text}>{oneSelectedProduct.text}</div>

                        <div className={styles.one_selected_product_price}>{`cena: ${oneSelectedProduct.price} VC`}</div>

                        {!choiceMade &&

                            <div className={styles.one_selected_product_buttons}>

                                <div className={styles.one_selected_product_button} onClick={() => setChoiceMade(true)}>To chci!</div>
                                <div className={styles.one_selected_product_button} onClick={() => setOneSelectedProduct(undefined)}>Zpět do katalogu</div>

                            </div>
                        }

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