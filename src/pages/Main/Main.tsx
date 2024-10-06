import { useSelector } from '../../hooks/Redux';
import { getData } from '../../services/selectors';
import { MESSAGE_ERROR } from '../../utils/Message';

import styles from './Main.module.css';
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';
import Loader from '../../components/Loader/Loader';

function MainPage() {

    const { data, dataLoading, dataHasErrors } = useSelector(getData);

    return (
        (dataLoading || dataHasErrors || !data || data.length === 0) ? (
            <main className={styles["wait__container"]}>
                {dataLoading ? (<Loader />) : dataHasErrors ? (<p className="text text_type_main-medium">{MESSAGE_ERROR}</p>) : undefined}
            </main>
        ) : (
            <main className={styles.main}>
                <div className={styles.inner}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </div>
            </main>
        )
    );
}

export default MainPage;