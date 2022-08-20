import React, { createContext, useState } from 'react'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import PageContent from './component/PageContent/PageContent'
import SingleProduct from './component/SingleProduct/SingleProduct'
import PagesConfig from './config/PagesConfig'
import ProductConfig, { orderByOptions, filterOptions } from './config/ProductConfig'
import { Routes, Route } from "react-router-dom"

/* we need to use global variables for catalog when catalog component is unmouted */
export const remeberedCatalogSettings = createContext<any>({
    filter: undefined,
    setFilter: () => { },
    order: undefined,
    setOrder: () => { },
});

function App() {

    const menuItems: Array<{ index: number, text: string, url: string }> = [];

    /* create menu items from import page configuration */
    PagesConfig.forEach((value: any, index: number) => {
        const menuItem = { index: index, text: value.title, url: value.url }
        menuItems.push(menuItem)
    })

    /* defaults for catalog page */
    const [filter, setFilter] = useState(filterOptions[0])
    const [order, setOrder] = useState(orderByOptions[0])

    return (
        <remeberedCatalogSettings.Provider value={{ filter, setFilter, order, setOrder }}>
            <div className="App">
                <>
                    <Header />

                    <Routes>
                        {(Array.isArray(menuItems) && menuItems.length > 0) && menuItems.map((item: any, index: number) => {
                            return (
                                <Route key={index} path={item.url} element={<PageContent />} />
                            )
                        })}
                        {(Array.isArray(ProductConfig) && ProductConfig.length > 0) && ProductConfig.map((item: any, index: number) => {
                            return (
                                <Route key={index} path={item.url} element={<SingleProduct />} />
                            )
                        })}
                    </Routes>

                    <Footer />

                </>

            </div>
        </remeberedCatalogSettings.Provider>
    )
}

export default App
