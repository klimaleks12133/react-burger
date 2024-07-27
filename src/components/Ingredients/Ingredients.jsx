import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Ingredients.module.css';
import { BUN } from '../../utils/dataName';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredientsTabs() {
    const [current, setCurrent] = useState(BUN);

    return (
        <div className={styles.tabs}>
        <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
          Начинки
        </Tab>
        </div>
    );
}

BurgerIngredientsTabs.propTypes = {
    tabChange: PropTypes.func.isRequired
};

export default BurgerIngredientsTabs;