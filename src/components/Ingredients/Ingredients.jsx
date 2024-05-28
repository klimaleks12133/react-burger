import React from 'react';
import styles from './Ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export interface IngredientsProps {
    name: string;
    price: number;
    image: string;
}

const Ingredients: React.FC<IngredientsProps> = ({ name, price, image }) => {
    return (
        <div className={styles.ingredients}>
            <img src={image} alt={name} />
            <span style={{ display: 'inline-flex' }}>
                <span style={{ marginRight: '8px' }}>{price}</span> <CurrencyIcon type="primary" />
            </span>
            <span>
                {name}
            </span>
        </div>
    );
}


export default Ingredients;