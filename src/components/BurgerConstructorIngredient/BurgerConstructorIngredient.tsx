import { useRef, FC } from 'react';
import { useDispatch } from '../../hooks/Redux';
import { useDrag, useDrop } from 'react-dnd';
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
        item: {index}
    });

    const [, drop] = useDrop<{index: number}>({
        accept: "sort",
        drop(item) {
            if (index !== item.index) {
                dispatch({ type: SWAP_INGREDIENTS, index1: index, index2: item.index });
            }
        }
    });

    drag(drop(ref));


    return (
        <li className={`${styles['list__item']} mt-4`} key={index} ref={ref}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                extraClass={`${styles.ingredient} ml-2`}
                handleClose={() => onDelete(index)}
            />
        </li>
    );
}

export default BurgerConstructorIngredient;