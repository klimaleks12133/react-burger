import img from '../../images/done.svg';
import styles from './OrderDetails.module.css';
import Modal from '../Modal/Modal';
import PropTypes from 'prop-types';

function OrderDetails({ number, onClose }) {
    return (
        <Modal onClose={onClose}>
            <div className={styles.wrapper}>
                <h2 className={styles.number}>034536</h2>
                <p className={styles.subtitle}>идентификатор заказа</p>
                <img src={img} className={styles.image} alt="Заказ принят" />
                <p className={styles.text}>Ваш заказ начали готовить</p>
                <p className={styles.subtext}>Дождитесь готовности на орбитальной станции</p>
            </div>
        </Modal>
    );
}

OrderDetails.propTypes = {
    number: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
}

export default OrderDetails;