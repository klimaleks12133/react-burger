import { useRef, FC } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { dataPropTypes } from '../../utils/DataProps';
import { SWAP_INGREDIENTS } from '../../services/actions/BurgerConstructor';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './BurgerConstructorIngredient.module.css';
import { TIngredientConstructor } from '../../utils/Types';

type TProps = {
    item: TIngredientConstructor;
    index: number;
    onDelete: (index: number) => void;
};

const BurgerConstructorIngredient: FC<TProps> = ({ item, index, onDelete }) => {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const [, drag] = useDrag({
        type: "sort",
        item: { index }
    });
    const [, drop] = useDrop<TIngredientConstructor>({
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


export default BurgerConstructorIngredient;