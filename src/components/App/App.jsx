import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadIngredientsAction } from '../../services/actions/LoadingIngredients';
import BurgerIngredients from '../BurgerIngredients//BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import AppHeader from '../AppHeader/AppHeader';
import styles from './App.module.css';


const MESSAGE_LOADING = "Подождите, идет загрузка...";
const MESSAGE_ERROR = "Возникла ошибка при получении данных";

function App() {
    const { data, dataLoading, dataHasErrors } = useSelector(state => state.loadIngredients);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadIngredientsAction());
    }, [dispatch]);

    return (
        <>
            {(dataLoading || dataHasErrors) ? (
                <main className={styles.wait}>
                    <p className="text text_type_main-large">
                        {dataLoading ? MESSAGE_LOADING : dataHasErrors ? MESSAGE_ERROR : undefined}
                    </p>
                </main>
            ) : data && data.length > 0 ? (
                <>
                    <AppHeader />
                    <main className={styles.main}>
                        <div className={styles.inner}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </div>
                    </main>
                </>)
                :
                undefined
            }
        </>
    );
}
export default App;