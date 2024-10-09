import { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TOrder, TOrdersList } from '../../utils/Types';
import styles from './OrdersStatus.module.css';

type TProp = {
    data: TOrdersList
};

const OrdersStatus: FC<TProp> = ({ data }) => {

    const countRowInColumn = 10;

    const location = useLocation();
  
    const doneOrders = useMemo(
      () => data.orders.filter((elem: TOrder) => elem.status === 'done')
        .map((elem: TOrder) => elem.number),
      [data.orders]
    );
    const pendingOrders = useMemo(
      () => data.orders.filter((elem: TOrder) => elem.status === 'pending')
        .map((elem: TOrder) => elem.number),
      [data.orders]
    );
  
    const doneOrdersFirstColumn = useMemo(
      () => doneOrders.slice(0, countRowInColumn),
      [doneOrders]
    );
    const doneOrdersSecondColumn = useMemo(
      () => doneOrders.slice(countRowInColumn, 2 * countRowInColumn),
      [doneOrders]
    );
  
    const pendingOrdersFirstColumn = useMemo(
      () => pendingOrders.slice(0, countRowInColumn),
      [pendingOrders]
    );
    const pendingOrdersSecondColumn = useMemo(
      () => pendingOrders.slice(countRowInColumn, 2 * countRowInColumn),
      [pendingOrders]
    );

    
    return (
        <>
            <div className={styles.list__orders}>
                <section>
                    <p className="text text_type_main-medium">Готовы:</p>
                    <div className={`${styles.list__number_orders} ${styles.ready__orders}`}>
                        <ul className={styles.ul__orders}>
                            {doneOrdersFirstColumn.map((item, index) =>
                                <li key={index} className="mt-2 mr-8">
                                    <Link to={`${item}`} state={{ location: location }} className={styles.ready__order}>
                                        <span className="text text_type_digits-default">{item}</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                        <ul className={styles.ul__orders}>
                            {doneOrdersSecondColumn.map((item, index) =>
                                <li key={index} className="mt-2 mr-8">
                                    <Link to={`${item}`} state={{ location: location }} className={styles.ready__order}>
                                        <span className="text text_type_digits-default">{item}</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </section>
                <section>
                    <p className="text text_type_main-medium">В работе:</p>
                    <div className={styles.list__number_orders}>
                        <ul className={styles.ul__orders}>
                            {pendingOrdersFirstColumn.map((item, index) =>
                                <li key={index} className="mt-2 mr-8">
                                    <Link to={`${item}`} state={{ location: location }} className={styles.work__order}>
                                        <span className="text text_type_digits-default">{item}</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                        <ul className={styles.ul__orders}>
                            {pendingOrdersSecondColumn.map((item, index) =>
                                <li key={index} className="mt-2 mr-8">
                                    <Link to={`${item}`} state={{ location: location }} className={styles.work__order}>
                                        <span className="text text_type_digits-default">{item}</span>
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </section>
            </div>
            <section>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className={`${styles.text__sh} text text_type_digits-large pb-8`}>{data.total}</p>
            </section>
            <section>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className={`${styles.text__sh} text text_type_digits-large pb-8`}>{data.totalToday}</p>
            </section>
        </>
    );
}

export default OrdersStatus;