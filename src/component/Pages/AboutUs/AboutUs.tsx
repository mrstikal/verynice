import React, { memo } from 'react'
import styles from './AboutUs.module.css'
import image1 from '../../../assets/image/a.jpg'
import image2 from '../../../assets/image/c.jpg'
import image3 from '../../../assets/image/b.jpg'
import LazyLoad from 'react-lazyload'
import Preloader from '../../Preloader/Preloader'

/* The lazy loader is intentionally set to make the preloader visible. */
/* nothing special is happening here, we are just returning page content */

const AboutUs = () => {

    return (
        <div className={styles.aboutus_holder}>

            <h1 className={styles.light}>Jsme specialisté na prodej, přepravu a&nbsp;instalaci nádherných scenérií z&nbsp;celého&nbsp;světa.</h1>

            <h2 className={styles.light}>Know-how</h2>

            <div className={styles.text}>
                Jako jediní na světě v tomto oboru disponujeme kompletním know-how.
            </div>

            <div className={styles.image}>
                <LazyLoad height={250} resize={true} placeholder={<Preloader />}>
                    <img src={image1} alt=''></img>
                </LazyLoad>
            </div>

            <h2 className={styles.light}>Kvalifikovaní pracovníci</h2>

            <div className={styles.text}>
                Disponujeme vysoce kvalifikovanými pracovníky, kteří jsou schopní bezchybné extrakce lokality,
                její efektivní přepravy a&nbsp;koncové instalace v&nbsp;nemovitosti našeho zákazníka.
            </div>

            <div className={styles.image}>
                <LazyLoad height={250} resize={true} placeholder={<Preloader />}>
                    <img src={image2} alt=''></img>
                </LazyLoad>
            </div>

            <h2 className={styles.light}>Udržitelnost a životní prostředí</h2>

            <div className={styles.text}>
                V&nbsp;rámci udržitelného rozvoje veškerou techniku využíváme důsledně
                až do konce jejího životního cyklu. Šetříme tak suroviny, energie i&nbsp;lidské zdroje.
            </div>

            <div className={styles.image}>
                <LazyLoad height={250} resize={true} placeholder={<Preloader />}>
                    <img src={image3} alt=''></img>
                </LazyLoad>
            </div>

        </div>
    )
}

export default memo(AboutUs);