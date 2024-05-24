import React from 'react';

// import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
// import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import AppHeader from '../AppHeader/AppHeader';
import styles from './App.module.css';

class App extends React.Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <AppHeader />
                <main className={styles.main}>
                    {/* <BurgerIngredients />
                    <BurgerConstructor /> */}
                </main>
            </div>
        )
    }
}

export default App;