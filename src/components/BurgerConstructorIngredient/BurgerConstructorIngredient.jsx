import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import propTypes from 'prop-types';
import { dataPropTypes } from '../../utils/dataProps';
import { SWAP_INGREDIENTS } from '../../services/actions/BurgerConstructor';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructorIngredient.module.css';


function BurgerConstructorIngredient({ item, index, onDelete }) {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const [, drag] = useDrag({
        type: "sort",
        item: { index }
    });
    const [, drop] = useDrop({
        accept: "sort",
        drop(item) {
            if (index !== item.index) {
                dispatch({ type: SWAP_INGREDIENTS, index1: index, index2: item.index });
            }
        }
    });
    drag(drop(ref));

    return (
        <li className={styles.list__item} key={index} ref={ref}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                extraClass={styles.ingredient}
                handleClose={() => onDelete(index)}
            />
        </li>
    );
}

BurgerConstructorIngredient.propTypes = {
    item: dataPropTypes.isRequired,
    index: propTypes.number,
    onDelete: propTypes.func.isRequired
}

export default BurgerConstructorIngredient;