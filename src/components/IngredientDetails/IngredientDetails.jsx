import styles from './IngredientDetails.module.css'
import Modal from '../Modal/Modal';
import { dataPropTypes } from '../../utils/dataProps';
import PropTypes from 'prop-types';

function IngredientDetails({ item, onClose, ingredient }) {
    return (
        <Modal caption="Детали ингридиента" onClose={onClose}>
            <div className={styles.wrapper}>
                <img src={item.image} className={styles.img} alt={item.name} />
                <h2 className={styles.title}>{item.name}</h2>
                <ul className={styles.grid}>
                    <li className={styles.item}>
                        <span>Калории,ккал</span>
                        <span className={styles.digit}>{item.calories}</span>
                    </li>
                    <li className={styles.item}>
                        <span>Белки, г</span>
                        <span className={styles.digit}>{item.proteins}</span>
                    </li>
                    <li className={styles.item}>
                        <span>Жиры, г</span>
                        <span className={styles.digit}>{item.fat}</span>
                    </li>
                    <li className={styles.item}>
                        <span>Углеводы, г</span>
                        <span className={styles.digit}>{item.carbohydrates}</span>
                    </li>
                </ul>
            </div>
        </Modal>
    );
}

IngredientDetails.propTypes = {
    item: dataPropTypes.isRequired,
    onClose: PropTypes.func.isRequired
}


export default IngredientDetails;