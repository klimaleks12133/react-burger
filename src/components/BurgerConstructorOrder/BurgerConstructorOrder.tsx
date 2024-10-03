import { useMemo, useEffect, useCallback, FC } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_ORDER, createOrderAction } from '../../services/actions/Order';
import { authGetUserAction } from '../../services/actions/Auth';
import { getAuth, getIngredients, createOrder } from '../../services/selectors';

import styles from './BurgerConstructorOrder.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';
import { TIngredientConstructor } from '../../utils/Types';

const BurgerConstructorOrder: FC = () => {
    const { bun, ingredients, sum } = useSelector(getIngredients);
    const { orderNumber, orderLoading, orderHasErrors } = useSelector(createOrder);

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
            dispatch(authGetUserAction() as any);
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
            dispatch(createOrderAction(orderIngredients as Array<TIngredientConstructor>) as any);
        }
    }, [requestStart, userLoggedIn, navigate, ingredients, bun, dispatch]);

    function hideOrder() {
        dispatch({ type: CLEAR_ORDER });
    }

    return (
        <div className={styles.total}>
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
    );
}

export default BurgerConstructorOrder;