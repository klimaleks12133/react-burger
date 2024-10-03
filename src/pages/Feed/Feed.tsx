import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ORDERS_ALL_END, ORDERS_ALL_START } from '../../services/actions//OrdersAll';
import { WS_URL } from '../../utils/Api';
import { getOrdersAll } from '../../services/selectors';
import styles from './Feed.module.css';
import OrdersList from '../../components/OrderList/OrderList';
import OrdersStatus from '../../components/OrderStatus/OrderStatus';
import Loader from '../../components/Loader/Loader';
function FeedPage() {
    const dispatch = useDispatch();
    const { connected, error, message } = useSelector(getOrdersAll);
    useEffect(() => {
        dispatch({ type: ORDERS_ALL_START, url: `${WS_URL}/orders/all` });
        return () => {
            dispatch({ type: ORDERS_ALL_END });
        }
    }, [dispatch]);
    return (
        <div className={styles.container}>
            {!connected && <Loader />}
            {!!error && <p className={`mb-2 error-text text text_type_main-default`}>{error}</p>}
            {connected && !!message && (
                <main className={styles.content}>
                    <section className={styles.left_section}>
                        <p className="text text_type_main-large mt-6">Лента заказов</p>
                        <OrdersList data={message} />
                    </section>
                    <section className={styles.right_section}>
                        <OrdersStatus data={message} />
                    </section>
                </main>
            )}
        </div>
    );
}
export default FeedPage;