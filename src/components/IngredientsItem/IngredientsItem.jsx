import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import propTypes from 'prop-types';
import { dataPropTypes } from '../../utils/DataProps';
import styles from './IngredientsItem.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { SET_DISPLAYED_INGREDIENT } from '../../services/actions/Ingredient';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function IngredientsItem({ item, count }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const showDialogItem = useCallback(() => {
        navigate(`/ingredients/${item._id}`, { replace: true, state: { location: location, item: item } });
        // dispatch({ type: SET_DISPLAYED_INGREDIENT, item: item });
    }, [dispatch, navigate, location, item]);

    const [, dragRef] = useDrag({
        type: item.type,
        item: item
    });

    return (
        <Link className={styles.link} to={`/ingredients/${item._id}`} state={{ background: location }} ref={dragRef}>
            <li className={styles.card}>
                <img className={styles.image}src={item.image} alt="Ингридиент" />
                <div className={styles.price}>
                    <span className="text text_type_digits-default mr-2">{item.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <div className={`${styles.title} text text_type_main-default`}>{item.name}</div>
                {count > 0 && <Counter count={count} size="default" extraClass={styles.count} />}
            </li>
        </Link>
    );

}

IngredientsItem.propTypes = {
    item: dataPropTypes.isRequired,
    count: propTypes.number
}

export default IngredientsItem;