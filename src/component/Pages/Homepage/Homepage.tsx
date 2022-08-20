import React, { memo } from 'react'
import styles from './Homepage.module.css'
import homeImage from '../../../assets/image/home.jpg'
import LazyLoad from 'react-lazyload'
import Preloader from '../../Preloader/Preloader'


const Homepage = () => {

    return (
        <div className={styles.homepage_holder}>

            <h1 className={styles.light}>Už žádné imitace v&nbsp;podobě plakátů, pohlednic nebo jiných kopií!</h1>

            <div className={styles.home_image}>
                <LazyLoad height={250} resize={true} placeholder={<Preloader />}>
                    <img src={homeImage} alt=''></img>
                </LazyLoad>
            </div>

            <h2 className={styles.light}>
                Do 24 hodin dodáme <strong>SKUTEČNÝ</strong> Vámi vybraný produkt až do Vašeho domova.
                <br></br>
                Včetně příslušných prací (usazení hor na stabilní podlaží, zapuštění kořenů stromů,
                instalace slunce na horizont apod.)
            </h2>

            <div className={styles.text}>
                Získáte unikát, který nikde jinde na světe neexistuje. Budete si jej užívat jen a jen Vy v klidu svého domova *
                <br></br><br></br>
                Neváhejte nahlédnout do našeho katalogu.
                <br></br>
                A pospěšte si s nákupem, většina položek se vyprodá velmi rychle!
                <br></br><br></br>
                Ať je Váš život prostě VeryNice!

            </div>

            <div className={styles.notice}>
                * u vyšších objektů, např. hor, nelze při umístění v exteriéru zabezpečit, aby Vaši instalace nemohla být pozorována i odjinud
            </div>

        </div>
    )
}

export default memo(Homepage);