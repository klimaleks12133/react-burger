import React from 'react';

import {
    BurgerIcon,
    ListIcon,
    ProfileIcon,
    Logo
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './AppHeader.module.css';

class AppHeader extends React.Component {
    render() {
        return (
            <header className={styles.header}>
                <menu className={styles.header__menu}>
                    <nav className={styles.header__nav}>
                        <a href="#" className={styles.header__link}>
                            <BurgerIcon type="primary" />
                            <span>Конструктор</span>
                        </a>
                        <a href="#" className={styles.header__link}>
                            <ListIcon type="secondary" />
                            <span>Лента заказов</span>
                        </a>
                    </nav>
                    <span className={styles.header__logo}><Logo /></span>
                    <button className={styles.header__button} type="button">
                        <ProfileIcon type="secondary" />
                        <span>Личный кабинет</span>
                    </button>
                </menu>
            </header>
        )
    }
}


export default AppHeader;