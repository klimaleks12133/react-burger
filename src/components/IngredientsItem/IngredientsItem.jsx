import { useState } from 'react';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/dataProps';
import styles from './IngredientsItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function BurgerIngredientItem({ item, count }) {
    const [show, setShow] = useState(false);

    function showDialog() {
        setShow(true);
    }

    function hideDialog(e) {
        setShow(false);
        e.stopPropagation();
    }

    return (
        <li className={styles.card} onClick={showDialog}>
            <img className={styles.image} src={item.image} alt="Ингридиент" />
            <div className={styles.price}>
                <span className="text text_type_digits-default mr-2">{item.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.title}>{item.name}</div>
            {count && count > 0 ? <Counter count={count} size="default" extraClass={styles.count} /> : undefined}
            {show && <IngredientDetails item={item} onClose={hideDialog} />}
        </li>
    );
    
}

BurgerIngredientItem.propTypes = {
    item: dataPropTypes.isRequired,
    count: PropTypes.number
}

export default BurgerIngredientItem;