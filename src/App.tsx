import React, { useState, useEffect, lazy } from 'react'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import PageContent from './component/PageContent/PageContent'
import PagesConfig from './config/PagesConfig'


function App() {

    const [pages, setPages] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [menuItems, setMenuItems] = useState<any>([])

    useEffect(() => {

        const importedPages: any[] = [];
        const importedMenuItems: any[] = [];

        const importPages = async () => {
            PagesConfig.forEach(async (value: any, index: number) => {
                const importedComponent = lazy(() => import('./component/Pages/' + value.templage + '/' + value.templage))
                importedPages.push(importedComponent)
                const menuItem = { index: index, text: value.title }
                importedMenuItems.push(menuItem)
            })

            setPages(importedPages)
            setMenuItems(importedMenuItems)
        }

        importPages();

    }, [])

    const pageChangeHandler = (index: number) => {
        setCurrentPage(index)
    }

    return (
        <div className="App">
            <Header
                currentPage={currentPage}
                menuItems={menuItems}
                pageChangeHandler={pageChangeHandler}
            />

            <PageContent
                currentPage={currentPage}
                pages={pages}
            />

            <Footer />

        </div>
    )
}

export default App
