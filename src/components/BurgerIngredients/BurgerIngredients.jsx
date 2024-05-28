import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerIngredients.module.css';
import IngredientsList from '../IngredientsList/IngredientsList';

function BurgerIngredients() {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className={styles.column}>
            <p className="text text_type_main-large">
                Соберите бургер
            </p>
            <div className={styles.column__list}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>

            <div className={styles.column__scrollzone}>
                <IngredientsList listType={'bun'} />

                <IngredientsList listType={'main'} />

                <IngredientsList listType={'sauce'} />
            </div>

        </div>
    );
}


export default BurgerIngredients;