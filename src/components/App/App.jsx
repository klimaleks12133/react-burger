import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { loadIngredientsAction } from '../../services/actions/LoadIngredients';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import {
    MainPage, IngredientPage,
    Profile, ProfileEdit, ProfileOrders, ProfileLogout,
    Login, Register, ResetPassword, ForgotPassword, NotFound404, FeedPage, OrderPage
} from '../../pages';
import ProtectedRoute from '../Protected-route';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderInfo from '../OrderInfo/OrderInfo';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;
    useEffect(() => {
        dispatch(loadIngredientsAction());
    }, [dispatch]);

    const handleCloseModalDetail = () => {
        navigate(-1);
    };
    return (
        <div className={styles.container}>
            <AppHeader />
            <div className={styles.main}>
                <Routes location={background || location}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/feed" element={<FeedPage />} />
                    <Route path="/ingredients/:id" element={<IngredientPage />} />
                    <Route path="/feed/:id" element={<OrderPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/profile" element={<ProtectedRoute element={<Profile />} />}>
                        <Route index element={<ProfileEdit />} />
                        <Route path="orders" element={<ProfileOrders />} />
                        <Route path="orders/:id" element={<OrderPage />} />
                        <Route path="logout" element={<ProfileLogout />} />
                        <Route path="*" element={<NotFound404 />} />
                    </Route>
                    <Route path="*" element={<NotFound404 />} />
                </Routes>
                {background &&
                    <Routes>
                        <Route path="/ingredients/:id" element={
                            <Modal onClose={handleCloseModalDetail}>
                                <IngredientDetails />
                            </Modal>
                        } />
                        <Route path="/profile/orders/:id"  element={
                            <Modal onClose={handleCloseModalDetail}>
                                <OrderInfo />
                            </Modal>
                        } />
                    </Routes>
                }
            </div>
        </div >

    );
}

export default App;