import React from 'react';
import Navigation from '../Navigation/Navigation'
import global_styles from '../../App.module.css';
import styles from './Header.module.css';

type menuItemsType = {
    index: number;
    text: undefined;
}

interface IHeader {
    currentPage: number,
    menuItems: menuItemsType[],
    pageChangeHandler(e: number): any
}

const Header = (props: IHeader) => {

    const { currentPage, pageChangeHandler, menuItems } = props

    return (
        <>
            <div className={global_styles.top_decorator}></div>

            <div className={`${global_styles.outer_wrapper} ${global_styles.auto_margin} ${styles.top}`}>

                <div className={`${global_styles.inner_wrapper} ${styles.header_wrapper} ${global_styles.auto_margin}`}>

                    <div className={global_styles.logo}></div>

                    <Navigation
                        menuItems={menuItems}
                        currentPage={currentPage}
                        pageChangeHandler={pageChangeHandler}
                    />

                </div>

            </div>
        </>
    )

}

export default Header;