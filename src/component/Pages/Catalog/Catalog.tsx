import React, { useState } from 'react'
import global_styles from '../../App.module.css'
import styles from './PageContent.module.css'
import allProducts from '../../../config/ProductConfig'
import _orderBy from 'lodash/orderBy'
import Select from 'react-select'

const initialProducts = _orderBy(allProducts, o => +o.price, ["asc"])

const Catalog = () => {

    const [selectedProducts, setSelectedProducts] = useState(initialProducts)

    const [orderBy, setOrderBy] = useState('price')
    const [orderByDirection, setOrderByDirection] = useState('asc')

    const [filterBy, setFiterBy] = useState('Vše')

    const handleOrderBy = (orderby: string = 'price', orderDirection: 'asc' | 'desc' = 'asc') => {

        if (orderby === 'id' || orderby === 'price' || orderby === 'popularity') {
            const ordered = _orderBy(selectedProducts, o => +o.orderby, [orderDirection])
            setSelectedProducts(ordered)
        } else {
            const ordered = _orderBy(selectedProducts, o => o.orderby, [orderDirection])
            setSelectedProducts(ordered)
        }
    }

    const handleFilter = (category: string) => {

        let filtered: any;

        if (category === 'Vše') {
            filtered = initialProducts
        } else {
            filtered = initialProducts.filter((product: any) => {
                return product.categories.includes(category)
            })
        }
        setFiterBy(category)
        setSelectedProducts(filtered)
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

    return (
        <>
        {console.log(selectedProducts)}
            <div>Katalog</div>
            <Select
                options={filterOptions}
                placeholder={null}
                defaultValue={filterOptions[0]}
                onChange={(e: any) => handleFilter(e.value)}
            />
        </>
    )
}

export default Catalog;