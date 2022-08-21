import React, { Suspense, useContext, useEffect } from 'react'
import global_styles from '../../App.module.css'
import styles from './PageContent.module.css'
import { useLocation } from 'react-router-dom'
import PagesConfig, { CATALOG_PAGE } from '../../config/PagesConfig'
import Preloader from '../Preloader/Preloader'
import { remeberedCatalogSettings } from '../../App'
import { orderByOptions, filterOptions } from '../../config/ProductConfig'

const PageContent = () => {

    const { setOrder, setFilter } = useContext(remeberedCatalogSettings)

    /* get module from router loaction */
    const location = useLocation();
    const toFind = location.pathname.replace('/', '')
    const template = PagesConfig.find(o => o.url === toFind)?.template;

    /* lazy import appropriate component */
    const Component = React.lazy(() => import(`../Pages/${template}/${template}`));

    /* detect if current page is catalog */
    useEffect(() => {
        if (template !== CATALOG_PAGE) {
            setOrder(orderByOptions[0])
            setFilter(filterOptions[0])
        sessionStorage.removeItem('catalogScrollPosition')

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Component])

    return (

        <div className={`${global_styles.outer_wrapper} ${global_styles.auto_margin}`}>

            <div className={`${global_styles.inner_wrapper} ${styles.page_content_wrapper} ${global_styles.auto_margin}`}>

                {/* page were imported via lazy, so we need render it within Suspense */}
                <Suspense fallback={<Preloader />}>
                    {Component && <Component />}
                </Suspense>

            </div>

        </div>
    )
}

export default PageContent;