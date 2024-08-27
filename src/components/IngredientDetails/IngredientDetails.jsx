import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getData } from '../../services/selectors';
import { MESSAGE_ERROR, MESSAGE_LOADING } from '../../utils/Message';
import styles from './IngredientDetails.module.css'
import { dataPropTypes } from '../../utils/DataProps';

function IngredientDetails({ item }) {
    const params = useParams();
    const { data, dataLoading, dataHasErrors } = useSelector(getData);
    let item1 = useMemo(() => {
        if (item) {
            return item;
        } else if (params.id && data && data.length > 0) {
            return data.find(i => i._id === params.id);
        }
        return null;
    }, [item, params.id, data]);

    return item1 ? (
        <>
            <div className={styles.wrapper}>
                <img src={item1.image} className={styles.img} alt={item1.name} />
                <h2 className={styles.title}>{item1.name}</h2>
                <ul className={styles.grid}>
                    <li className={styles.item1}>
                        <span>Калории,ккал</span>
                        <span className={styles.digit}>{item1.calories}</span>
                    </li>
                    <li className={styles.item1}>
                        <span>Белки, г</span>
                        <span className={styles.digit}>{item1.proteins}</span>
                    </li>
                    <li className={styles.item1}>
                        <span>Жиры, г</span>
                        <span className={styles.digit}>{item1.fat}</span>
                    </li>
                    <li className={styles.item1}>
                        <span>Углеводы, г</span>
                        <span className={styles.digit}>{item1.carbohydrates}</span>
                    </li>
                </ul>
            </div>
        </>
    ) : (
        <p className="text text_type_main-medium">
            {dataLoading ? MESSAGE_LOADING : dataHasErrors ? MESSAGE_ERROR : undefined}
        </p>
    );
}

IngredientDetails.propTypes = {
    item: dataPropTypes
}


export default IngredientDetails;