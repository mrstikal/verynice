import React, { useEffect, useContext, useState, useLayoutEffect, useRef, Fragment } from 'react'
import global_styles from '../../../App.module.css'
import styles from './Catalog.module.css'
import Select from 'react-select'
import './ReactSelect.css'
import { Link } from "react-router-dom";
import { remeberedCatalogSettings } from '../../../App'
import { orderByOptions, filterOptions } from '../../../config/ProductConfig'
import { useDispatch, useSelector } from 'react-redux'
import { orderAndFilter } from '../../../features/productSlice'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Catalog = () => {

    const { filter, setFilter, order, setOrder } = useContext(remeberedCatalogSettings)

    /* remember scroll position after filter or order change */
    const [scrollPosition, setScrollPosition] = useState(0)

    /* ref to product images holders */
    const imageRefs = useRef([]) as any

    /* using Redux is of course overkill, it is used here only for demonstration */
    const products = useSelector((state: any) => {
        if (!sessionStorage.getItem('catalogScrollPosition')) {
            window.scrollTo(0, scrollPosition)
        }
        return state.selectedProducts.products
    })
    const dispatch = useDispatch()

    /* set filter and order from global storage */
    useEffect(() => {
        setFilter(filter)
        setOrder(order)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* order by and filter products */
    useEffect(() => {
        dispatch(orderAndFilter({ order, filter }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order, filter])

    /* restore catalog scroll position after user returned from single product */
    useLayoutEffect(() => {
        const prevPosition = sessionStorage.getItem('catalogScrollPosition')
        if (prevPosition) {
            window.scrollTo(0, Number(prevPosition))
        }
    }, [])

    const handleFilterChange = (e: any) => {
        setFilter(e)
        setScrollPosition(window.scrollY)
    }

    const handleOrderChange = (e: any) => {
        setOrder(e)
        setScrollPosition(window.scrollY)
    }

    const handleScrollPosition = () => {
        sessionStorage.setItem('catalogScrollPosition', String(window.scrollY))
    }

    return (
        <>

            <h1 className={styles.light}>Katalog</h1>

            {(products.length) &&
                <>

                    <div className={`${styles.selectors_container} ${global_styles.auto_margin}`}>

                        <div className={styles.label}>Téma</div>
                        <Select
                            className='select_element_container'
                            classNamePrefix='select_element'
                            options={filterOptions}
                            placeholder={null}
                            defaultValue={filterOptions[0]}
                            value={filter}
                            onChange={(e: any) => handleFilterChange(e)}
                            menuPortalTarget={document.body}
                        />

                        <div className={styles.label}>Řadit dle</div>
                        <Select
                            className='select_element_container'
                            classNamePrefix='select_element'
                            options={orderByOptions}
                            placeholder={null}
                            defaultValue={orderByOptions[0]}
                            value={order}
                            onChange={(e: any) => handleOrderChange(e)}
                            menuPortalTarget={document.body}
                        />
                    </div>

                    <div className={styles.price_info}>
                        Veškeré ceny jsou uvedeny ve VeryniceCoins - VC (s&nbsp;jednoduchým&nbsp;V!)
                        <br></br>
                        Platby v jiných měnách nejsou akceptovány.
                    </div>


                    <div className={styles.product_grid}>

                        {products.map((product: any, index: number) => {

                            return (
                                <Fragment key={index}>

                                    <Link
                                        to={`/${product.url}`}
                                        className={styles.one_grid_product}
                                        onClick={handleScrollPosition}
                                    >

                                        <div className={styles.image_holder} ref={el => imageRefs.current[index] = el} >

                                            <LazyLoadImage
                                                height={250}
                                                src={`/image/product/${product.image}`}
                                                width={250}
                                                afterLoad={() => imageRefs.current[index].classList.add(styles.loaded)}
                                                threshold={-50}
                                            />
                                            <div className={styles.preloader_body}></div>

                                        </div>

                                        <div className={styles.overview_title}>{product.name}</div>

                                        <div className={styles.overview_price}>{`cena: ${product.price} VC`}</div>


                                    </Link>

                                </Fragment>
                            )
                        })}

                    </div>
                </>
            }
        </>
    )
}

export default Catalog