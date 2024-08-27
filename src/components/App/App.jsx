import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import IngredientDetails from '../IngredientDetails/IngredientDetails';

function App() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;
    const item = location.state && location.state.item;
    useEffect(() => {
        dispatch(loadIngredientsAction());
    }, [dispatch, item]);

    const handleCloseModalDetail = () => {
        navigate(-1);
    };

    const stateLocation = location.state && location.state.location;


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
                {stateLocation &&
                    <Routes>
                        <Route path="/ingredients/:id" element={
                            <Modal onClose={handleCloseModalDetail}>
                                <IngredientDetails />
                            </Modal>
                        } />
                    </Routes>
                }
            </div>
        </div >

    );
}

export default App;