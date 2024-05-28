import React from 'react';
import styles from './BurgerConstructor.module.css';
import data from '../../utils/data'
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';


class BurgerConstructor extends React.Component {
    render() {
    const bunUp = data.find(item => item._id === '60666c42cc7b410027a1a9b1');
    const bunDown = data.find(item => item._id === '60666c42cc7b410027a1a9b2');
    return (
        <div className={styles.column}>
            <div className={styles.column__header}/>
            <div className={styles.column__list}>
                {(bunUp)?
                    <ConstructorElement
                        key={bunUp._id}
                        type="top"
                        isLocked={true}
                        text={bunUp.name}
                        price={bunUp.price}
                        thumbnail={bunUp.image}
                    /> : null}
                {data.map((itm) => {
                    return (itm.type === 'main' || itm.type === 'sauce') ?
                        <ConstructorElement
                            key={itm._id}
                            text={itm.name}
                            price={itm.price}
                            thumbnail={itm.image}
                        /> : null}
                    )
                }
                {(bunDown)?
                    <ConstructorElement
                        key={bunDown._id}
                        type="bottom"
                        isLocked={true}
                        text={bunDown.name}
                        price={bunDown.price}
                        thumbnail={bunDown.image}
                    /> : null}
            </div>

            <div className={styles.column__price}>
                <p className="text text_type_digits-medium">610</p>
                <CurrencyIcon type="primary"/>
                <Button type="primary" size="medium">Оформить заказ</Button>
            </div>
        </div>
    );
}
}
export default BurgerConstructor;