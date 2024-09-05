import { FC } from 'react';
import PropTypes from 'prop-types';
import img from '../../images/done.svg';
import styles from './OrderDetails.module.css';

type TProps = {
    number: string;
}

const OrderDetails: FC<TProps> = ({ number }) => {
        return (
        <>
        <div className={styles.wrapper}>
            <p className={styles.number}>{number}</p>
            <p className={styles.subtitle}>идентификатор заказа</p>
            <img src={img} className={styles.image} alt="Заказ принят" />
            <p className={styles.text}>Ваш заказ начали готовить</p>
            <p className={styles.subtext}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </>
    );
}

export default OrderDetails;