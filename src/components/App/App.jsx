import { useEffect, useState } from 'react';
import BurgerIngredients from '../BurgerIngredients//BurgerIngredients'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import AppHeader from '../AppHeader/AppHeader';
import styles from './App.module.css';
import { API_URL } from '../../constants/constants';



function App() {

    const [state, setState] = useState({ data: null, isLoading: true, isError: false });

    useEffect(() => {
        fetch(`${API_URL}`)
            .then(res => {
                if(res.ok) {
                    throw Error(`Неверный http-статус ответа: ${res.status}: ${res.statusText}`);
                }
                return res.json();
            })
            .then(res => {
                if (!res.success) {
                    throw Error('В json-ответе success !== true');
                }
                setState({ data: res.data, isLoading: false, isError: false });
            })
            .catch(err => {
                console.log('ошибка получения данных', err);
                setState({ data: null, isLoading: false, isError: true });
            });
    }, []);

    let message = null;
    if (state.isLoading) {
        message = "Подождите, идет загрузка...";
    }
    else if (state.isError) {
        message = "Возникла ошибка при получении данных";
    }

    return (
        <>
            {message && <main className={styles.wait}><p className="text text_type_main-large">{message}</p></main>}
            {!state.message && state.data && (
                <>
                    <AppHeader />
                    <main className={styles.main}>
                        <div className={styles.inner}>
                            <BurgerIngredients
                                data={state.data}
                            />
                            <BurgerConstructor
                                data={state.data}
                            />
                        </div>
                    </main>
                </>
            )}
        </>
    );
}

export default App;