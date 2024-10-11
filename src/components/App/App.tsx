import { useEffect } from 'react';
import { useDispatch } from '../../hooks/Redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { SET_DISPLAYED_INGREDIENT } from '../../services/actions/IngredientWindow';
import {
    URL_ROOT, URL_INGREDIENTS, URL_LOGIN, URL_REGISTER, URL_RESET_PASSWORD, URL_FORGOT_PASSWORD,
    URL_PROFILE, URL_PROFILE_ORDERS, URL_PROFILE_LOGOUT, URL_ANY, URL_FEED, URL_GITHUB
} from '../../utils/Routes';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import {
    MainPage, IngredientPage,
    Profile, ProfileEdit, ProfileOrders, ProfileLogout,
    Login, Register, ResetPassword, ForgotPassword, NotFound404, FeedPage, OrderPage
} from '../../pages';
import ProtectedRoute from '../ProtectedRoute';
import { loadIngredientsAction } from '../../services/actions/LoadIngredients';
import { authCheckUserAction } from '../../services/actions/Auth';
import OrderInfo from '../OrderInfo/OrderInfo';
import Modal from '../Modal/Modal';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadIngredientsAction());
        dispatch(authCheckUserAction());
    }, [dispatch]);

    const background = location.state && location.state.location;
    const item = location.state && location.state.item;
    useEffect(() => {
        dispatch({ type: SET_DISPLAYED_INGREDIENT, item: item });
    }, [dispatch, item]);

    const handleCloseModalDetail = () => {
        navigate(-1);
    }

    return (
        <div className={styles.container}>
            <AppHeader />
            <div className={styles.main}>
                <Routes location={background || location}>
                    <Route path={URL_ROOT} element={<MainPage />} />
                    <Route path={URL_GITHUB} element={<MainPage />} />
                    <Route path={URL_FEED} element={<FeedPage />} />
                    <Route path={`${URL_INGREDIENTS}/:id`} element={<IngredientPage />} />
                    <Route path={`${URL_FEED}/:id`} element={<OrderPage />} />
                    <Route path={URL_LOGIN} element={<Login />} />
                    <Route path={URL_REGISTER} element={<ProtectedRoute anonymous element={<Register />} />} />
                    <Route path={URL_RESET_PASSWORD} element={<ProtectedRoute anonymous element={<ResetPassword />} />} />
                    <Route path={URL_FORGOT_PASSWORD} element={<ProtectedRoute anonymous element={<ForgotPassword />} />} />
                    <Route path={URL_PROFILE} element={<ProtectedRoute element={<Profile />} />}>
                    <Route index element={<ProfileEdit />} />
                        <Route path={URL_PROFILE_ORDERS} element={<ProfileOrders />} />
                        <Route path={`${URL_PROFILE_ORDERS}/:id`} element={<OrderPage />} />
                        <Route path={URL_PROFILE_LOGOUT} element={<ProfileLogout />} />
                        <Route path={URL_ANY} element={<NotFound404 />} />
                    </Route>
                    <Route path={URL_ANY} element={<NotFound404 />} />
                </Routes>
                {background &&
                    <Routes>
                        <Route path={`${URL_FEED}/:id`} element={
                            <Modal onClose={handleCloseModalDetail}>
                                <OrderInfo />
                            </Modal>
                        } />
                        <Route path={`${URL_PROFILE}/${URL_PROFILE_ORDERS}/:id`} element={<ProtectedRoute element={
                            <Modal onClose={handleCloseModalDetail}>
                                <OrderInfo />
                            </Modal>
                        } /> }/> 
                    </Routes>
                }
            </div>
        </div >
    );
}

export default App;