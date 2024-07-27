import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import { dataPropTypes } from '../../utils/dataProps';
import { BUN } from '../../utils/dataName';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/OrderDetails';


function BurgerConstructor({ data, sum, number }) {
    const list = useMemo(() => data.filter(item => item.type !== BUN), [data]);
    const bun = useMemo(() => data.find(item => item.type === BUN), [data]);
    const [show, setShow] = useState(false);

    function showOrder() {
        setShow(true);
    }

    function hideOrder() {
        setShow(false);
    }

    return (
        <section className={styles.section}>
            <div className={styles.burger}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass={styles.ingredient}
                />
                <ul className={styles.scroll}>
                    {list.map((item, index) => (
                        <li className={styles['list-item']} key={index}>
                            <span className={styles.draggable}><DragIcon type="primary" /></span>
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                                extraClass={styles.ingredient}
                            />
                        </li>
                    ))}
                </ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={bun.name}
                    price={bun.price}
                    thumbnail={bun.image}
                    extraClass={styles.ingredient}
                />
            </div>
            <div className={styles.total} >
                <div className="text text_type_digits-medium mr-2 mb-1">{sum}</div>
                <div className={styles['total-icon']}><CurrencyIcon type="primary" /></div>
                <Button htmlType="button" type="primary" onClick={showOrder}>Оформить заказ</Button>
                {show && <OrderDetails number={number} onClose={hideOrder} />}
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
}

export default BurgerConstructor;