import styles from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IconLink from '../Icon/Icon';

function AppHeader() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <nav className={styles.left}>
                    <ul className={styles.list}>
                        <li><IconLink href="/" icon={BurgerIcon}>Конструктор</IconLink></li>
                        <li><IconLink href="/asd" icon={ListIcon}>Лента заказов</IconLink></li>
                    </ul>
                </nav>

                <div className={styles.center}>
                    <Logo />
                </div>

                <div className={styles.right}>
                    <IconLink href="/profile" icon={ProfileIcon}>Личный кабинет</IconLink>
                </div>
            </div>
        </header>
    );
}

export default AppHeader;