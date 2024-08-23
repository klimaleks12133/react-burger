import styles from './IngredientDetails.module.css'
import { dataPropTypes } from '../../utils/dataProps';
import PropTypes from 'prop-types';

function IngredientDetails({ item}) {
    return (
        <>
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
        </>
    );
}

IngredientDetails.propTypes = {
    item: dataPropTypes.isRequired,
    onClose: PropTypes.func.isRequired
}


export default IngredientDetails;