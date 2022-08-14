import React, { Suspense } from 'react'
import global_styles from '../../App.module.css'
import styles from './PageContent.module.css'


const PageContent = (props: any) => {

    const { currentPage, pages } = props;

    const Component = pages[currentPage];

    return (

        <div className={`${global_styles.outer_wrapper} ${global_styles.auto_margin}`}>

            <div className={`${global_styles.inner_wrapper} ${styles.page_content_wrapper} ${global_styles.auto_margin}`}>

                <Suspense>
                    {Component && <Component />}
                </Suspense>

            </div>

        </div>
    )
}

export default PageContent;