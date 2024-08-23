import React from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import propTypes from 'prop-types';
import { dataPropTypes } from '../../utils/dataProps';
import styles from './IngredientsItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { SET_DISPLAYED_INGREDIENT } from '../../services/actions/Ingredient';

function IngredientsItem({ item, count}) {
    const dispatch = useDispatch();

    function showDialogItem() {
        dispatch({type: SET_DISPLAYED_INGREDIENT, item: item});
    }

    const [, dragRef] = useDrag({
        type: item.type,
        item: item
    });

    return (
        <li className={styles.card} onClick={showDialogItem} ref={dragRef}>
            <img className={styles.image} src={item.image} alt="Ингридиент" />
            <div className={styles.price}>
                <span className="text text_type_digits-default mr-2">{item.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.title}>{item.name}</div>
            {count > 0 && <Counter count={count} size="default" extraClass={styles.count} />}
        </li>
    );
    
}

IngredientsItem.propTypes = {
    item: dataPropTypes.isRequired,
    count: propTypes.number
}

export default IngredientsItem;