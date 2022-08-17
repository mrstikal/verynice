import React, { Suspense, LazyExoticComponent, ComponentType } from 'react'
import global_styles from '../../App.module.css'
import styles from './PageContent.module.css'

interface IPageContent {
    pages: LazyExoticComponent<ComponentType<any>>[],
    currentPage: number
}

const PageContent = (props: IPageContent) => {

    const { currentPage, pages } = props;

    /* get current page component */
    const Component = pages[currentPage];

    return (

        <div className={`${global_styles.outer_wrapper} ${global_styles.auto_margin}`}>

            <div className={`${global_styles.inner_wrapper} ${styles.page_content_wrapper} ${global_styles.auto_margin}`}>

                {/* page were imported via lazy, so we need render it within Suspense */}
                <Suspense>
                    {Component && <Component />}
                </Suspense>

            </div>

        </div>
    )
}

export default PageContent;