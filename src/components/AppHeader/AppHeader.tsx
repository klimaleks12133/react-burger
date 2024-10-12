import { FC } from 'react';
import { URL_PROFILE, URL_ROOT, URL_FEED, URL_GITHUB } from '../../utils/Routes';
import styles from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IconLink from '../IconLink/IconLink';
import { useMatch } from 'react-router';


const AppHeader: FC = () => {
    const matchRoot = useMatch(URL_GITHUB);
    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <div className={styles.header__container}>
                <nav className={styles.header__left}>
                    <ul className={styles.header__list}>
                        <li><IconLink href={URL_ROOT} isActive2={!!matchRoot} icon={BurgerIcon}>Конструктор</IconLink></li>
                        <li><IconLink href={URL_FEED} icon={ListIcon}>Лента заказов</IconLink></li>
                    </ul>
                </nav>

                <div className={styles.logo__center}>
                    <Logo />
                </div>

                <div className={styles.icon__right}>
                    <IconLink href={URL_PROFILE} icon={ProfileIcon}>Личный кабинет</IconLink>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;