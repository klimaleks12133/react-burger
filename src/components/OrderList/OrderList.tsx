import { FC } from 'react';
import { TOrder, TOrdersList } from '../../utils/Types';
import OrdersListItem from '../OrderListItem/OrderListItem';
import styles from './OrderList.module.css';
type TProp = {
    data: TOrdersList
};
const OrdersList: FC<TProp> = ({ data }) => {
    return (
        <div className={`${styles.feed_orders} mt-4 mb-10`}>
            {data.orders && data.orders.map((elem: TOrder, index: number) =>
                <OrdersListItem key={index} order={elem} isPerson={false} />
            )}
        </div>
    );
}
export default OrdersList;