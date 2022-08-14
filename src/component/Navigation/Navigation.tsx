import React, { useEffect, useLayoutEffect, useState, useRef } from 'react';
import styles from './Navigation.module.css';


const Navigation = (props: any) => {

    const menuRef = useRef<HTMLDivElement>(null)

    const { menuItems, currentPage, pageChangeHandler } = props

    const [width, setWidth] = useState(0)
    const [isResponsive, setIsResponsive] = useState(false);
    const [menuOpened, setMenuOpened] = useState(false)

    const handleWindowResize = () => {
        setWidth(window.innerWidth)
    }

    const closeOpenMenu = (e: any) => {
        //@ts-ignore
        if (menuRef.current && menuOpened && !menuRef.current.contains(e.target)) {
            setMenuOpened(false)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize)
        document.addEventListener('mousedown', closeOpenMenu)
        return () => {
            window.removeEventListener('resize', handleWindowResize)
            document.removeEventListener('mousedown', closeOpenMenu)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useLayoutEffect(() => {
        setWidth(window.innerWidth)
    }, [])

    useLayoutEffect(() => {

        let menuWidth = undefined;

        const menu = menuRef.current;
        
        if (menu) {
            menuWidth = menu.clientWidth;
        }

        if (menuWidth && menuWidth < 320) {
            setIsResponsive(true)
        } else {
            setIsResponsive(false)
        }


    }, [width])

    return (
        <>
            {!isResponsive &&
                <div className={styles.menu_wrapper} ref={menuRef}>
                    {(Array.isArray(menuItems) && menuItems.length > 0) && menuItems.map((item: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className={`${styles.menu_item} ${index === currentPage ? `${styles.active}` : ''}`}
                                onClick={() => pageChangeHandler(index)}
                            >
                                {item.text}
                            </div>
                        )
                    })}
                </div>
            }
            {isResponsive &&
                <div className={styles.responsive_menu_wrapper} ref={menuRef}>

                    <div className={menuOpened ? styles.close_menu : styles.open_menu}>
                        {menuOpened &&
                            <div className={styles.close_menu_icon} onClick={() => setMenuOpened(false)}>
                                <div className={styles.rotated_menu_element_a}></div>
                                <div className={styles.rotated_menu_element_b}></div>
                            </div>
                        }
                        {!menuOpened &&
                            <div className={styles.open_menu_icon} onClick={() => setMenuOpened(true)}>
                                <div className={styles.menu_element}></div>
                                <div className={styles.menu_element}></div>
                                <div className={styles.menu_element}></div>
                            </div>
                        }
                    </div>

                    {menuOpened &&
                        <div className={styles.responsive_menu_holder}>
                            {(Array.isArray(menuItems) && menuItems.length > 0) && menuItems.map((item: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className={`${styles.responsive_menu_item} ${index === currentPage ? `${styles.active}` : ''}`}
                                        onClick={() => { pageChangeHandler(index); setMenuOpened(false) }}
                                    >
                                        {item.text}
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Navigation;