import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../hooks/Redux';
import { getOrdersUser } from '../../services/selectors';
import { ORDERS_USER_END, ORDERS_USER_START } from '../../services/actions/OrdersUser';
import { WS_URL } from '../../utils/Api';

import styles from './ProfileOrders.module.css';
import Loader from '../../components/Loader/Loader';
import OrdersList from '../../components/OrdersList/OrdersList';

function ProfileOrders() {
    const dispatch = useDispatch();
    const { connected, error, message } = useSelector(getOrdersUser);

    useEffect(() => {
        dispatch({ type: ORDERS_USER_START, url: `${WS_URL}/orders`, addToken: true });
        return () => {
            dispatch({ type: ORDERS_USER_END });
        }
    }, [dispatch]);

    return (
        <div className={styles.container}>
            {!connected && <Loader />}
            {!!error && <p className={`mb-2 error-text text text_type_main-default`}>{error}</p>}
            {connected && !!message && (
                <OrdersList data={message!} />
            )}
        </div>
    );
}

export default ProfileOrders;