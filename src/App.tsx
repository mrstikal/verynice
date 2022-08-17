import React, { useState, useEffect, lazy, LazyExoticComponent, ComponentType } from 'react'
import Header from './component/Header/Header'
import Footer from './component/Footer/Footer'
import PageContent from './component/PageContent/PageContent'
import PagesConfig from './config/PagesConfig'


function App() {

    /* config for all pages in app */
    const [pages, setPages] = useState<any>([]);

    /* set current page index */
    const [currentPage, setCurrentPage] = useState(0);

    /* menu items imported from page config */
    const [menuItems, setMenuItems] = useState<Array<{ index: number, text: string }>>([])

    useEffect(() => {

        const importedPages: LazyExoticComponent<ComponentType<any>>[] = [];
        const importedMenuItems: Array<{ index: number, text: string }> = [];

        /* imports pages and setup menu items from the configuration file */
        const importPages = async (): Promise<any> => {
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

    /* switch to another page - implemented in Header component */
    const pageChangeHandler = (index: number): void => {
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
