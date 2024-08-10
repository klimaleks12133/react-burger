import img from '../../images/done.svg';
import styles from './OrderDetails.module.css';
import PropTypes from 'prop-types';

function OrderDetails() {
    return (
        <>
            <div className={styles.wrapper}>
                <h2 className={styles.number}>034536</h2>
                <p className={styles.subtitle}>идентификатор заказа</p>
                <img src={img} className={styles.image} alt="Заказ принят" />
                <p className={styles.text}>Ваш заказ начали готовить</p>
                <p className={styles.subtext}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </>
    );
}

OrderDetails.propTypes = {
    number: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
}

export default OrderDetails;