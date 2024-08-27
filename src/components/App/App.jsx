import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation } from 'react-router-dom';
import { loadIngredientsAction } from '../../services/actions/LoadingIngredients';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import {
    MainPage, IngredientPage,
    Profile, ProfileEdit, ProfileOrders, ProfileLogout,
    Login, Register, ResetPassword, ForgotPassword, NotFound404
} from '../../pages';
import ProtectedRoute from '../Protected-route';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const stateLocation = location.state && location.state.location;
    const background = location.state && location.state.background;
    const item = location.state && location.state.item;
    useEffect(() => {
        dispatch(loadIngredientsAction());
    }, [dispatch, item]);





    return (
        <div className={styles.container}>
            <AppHeader />
            <div className={styles.main}>
                <Routes location={stateLocation || location}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/ingredients/:id" element={<IngredientPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/profile" element={<ProtectedRoute element={<Profile />} />}>
                        <Route index element={<ProfileEdit />} />
                        <Route path="orders" element={<ProfileOrders />} />
                        <Route path="logout" element={<ProfileLogout />} />
                        <Route path="*" element={<NotFound404 />} />
                    </Route>
                    <Route path="*" element={<NotFound404 />} />
                </Routes>
                {background &&
                    <Routes>
                        <Route path="/order" element={<ProtectedRoute element={<Modal>
                            <OrderDetails />
                        </Modal>
                        } />}
                        />
                        <Route path="ingridients/:id" element={<Modal title={'Детали ингридиента'}>
                            <IngredientDetails />
                        </Modal>}
                        />
                    </Routes>
                }
            </div>
        </div >
    );
}

export default App;