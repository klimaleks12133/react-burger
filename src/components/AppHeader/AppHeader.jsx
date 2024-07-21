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

                <div className={styles.header__text}>
                    <BurgerIcon type="primary" />
                    Конструктор

                    <ListIcon type="primary" />
                    Лента Заказов
                </div>

                <Logo/>
                <div className={styles.header__text}>
                <ProfileIcon type="primary" />
                    Личный кабинет
                </div>
            </menu>
        </header>
        )
    }
}

export default AppHeader;