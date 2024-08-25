import { useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ORDER, createOrderAction } from '../../services/actions/Order';
import { authGetUserAction } from '../../services/actions/Auth';
import { getAuth } from '../../services/selectors';
import { useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { SET_BUN, SET_SUM, DELETE_INGREDIENT, addIngredient } from '../../services/actions/BurgerConstructor';
import styles from './BurgerConstructor.module.css';
import { dataPropTypes } from '../../utils/DataProps';
import { BUN, SAUCE, MAIN } from '../../utils/DataName';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/OrderDetails';
import BurgerConstructorIngredient from '../BurgerConstructorIngredient/BurgerConstructorIngredient';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';

function BurgerConstructor() {
    const { bun, ingredients, sum } = useSelector(state => state.burgerConstructor);
    const { orderNumber, orderLoading, orderHasErrors } = useSelector(state => state.createOrder);

    useEffect(() => {
        if (orderHasErrors) {
            alert("Ошибка при создании заказа");
        }
    }, [orderHasErrors]);

    const disabled = useMemo(() => {
        let hasIngredient = (ingredients && ingredients.length > 0) || bun;
        let hasOrder = orderNumber !== null || orderLoading;
        return !hasIngredient || hasOrder;
    }, [bun, ingredients, orderNumber, orderLoading]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userLoggedIn, requestStart } = useSelector(getAuth);

    useEffect(() => {
        if (!userLoggedIn) {
            dispatch(authGetUserAction());
        }
    }, [userLoggedIn, dispatch]);

    const showOrder = useCallback(() => {
        if (requestStart) {
            return;
        }

        if (!userLoggedIn) {
            navigate('/login', { replace: true });
        } else {
            const orderIngredients = [...ingredients];
            if (bun) {
                orderIngredients.push(bun, bun);
            }
            dispatch(createOrderAction(orderIngredients));
        }
    }, [requestStart, userLoggedIn, navigate, ingredients, bun, dispatch]);

    function hideOrder() {
        dispatch({ type: CLEAR_ORDER });
    }

    useEffect(() => {
        let sum = 0;
        if (bun) {
            sum += bun.price * 2;
        }
        sum += ingredients.reduce((sum, item) => sum += item.price, 0);
        dispatch({ type: SET_SUM, sum });
    }, [bun, ingredients, dispatch]);

    const [, dropTargetBunUp] = useDrop({
        accept: BUN,
        drop(item) {
            dispatch({ type: SET_BUN, item: item });
        }
    });

    const [, dropTargetBunDown] = useDrop({
        accept: BUN,
        drop(item) {
            dispatch({ type: SET_BUN, item: item });
        }
    });

    const [, dropTargetIngredient] = useDrop({
        accept: [SAUCE, MAIN],
        drop(item) {
            dispatch(addIngredient(item));
        }
    });

    const deleteIngredient = useCallback((index) => {
        dispatch({ type: DELETE_INGREDIENT, index: index })
    }, [dispatch]);

    return (
        <section className={styles.section}>
            <div className={styles.burger}>
                <div ref={dropTargetBunUp}>
                    {bun ?
                        (<ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                            extraClass={styles.ingredient}
                        />) :
                        (<div className={styles.empty__element} >
                            <div className={styles.empty__element_text}>Перетащите булку</div>
                        </div>)
                    }
                </div>
                <ul className={styles.scroll} ref={dropTargetIngredient}>
                    {ingredients && ingredients.length > 0 ? ingredients.map((item, index) => (
                        <BurgerConstructorIngredient key={item.id} item={item} index={index} onDelete={deleteIngredient} />
                    )) :
                        (<div className={styles.empty__element} >
                            <div className={styles.empty__element_text}>Перетащите ингридиенты</div>
                        </div>)}
                </ul>
                <div ref={dropTargetBunDown}>
                    {bun ?
                        (<ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                            extraClass={styles.ingredient}
                        />) :
                        (<div className={styles.empty__element}>
                            <div className={styles.empty__element_text}>Перетащите булку</div>
                        </div>)
                    }
                </div>
            </div>
            <div className={styles.total} >
                {orderLoading ? <Loader /> : (
                    <>
                        <div className="text text_type_digits-medium mr-2 mb-1">{sum}</div>
                        <div className={styles.total__icon}><CurrencyIcon type="primary" /></div>
                        <Button htmlType="button" type="primary" disabled={disabled} onClick={showOrder}>Оформить заказ</Button>
                    </>
                )}
                {orderNumber && (
                    <Modal onClose={hideOrder}>
                        <OrderDetails number={orderNumber} />
                    </Modal>
                )}
            </div>
        </section>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired
}

export default BurgerConstructor;