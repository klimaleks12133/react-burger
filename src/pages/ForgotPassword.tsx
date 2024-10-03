// import { useCallback, useEffect } from 'react';
// import { useDispatch, useSelector } from '../hooks/Redux';

// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from '../hooks/UseForm';
// import { getAuth } from '../services/selectors';
// import { authGetUserAction, authForgotPasswordAction, AUTH_CLEAR_ERRORS } from '../services/actions/Auth';
// import './Page.css';
// import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
// import Loader from '../components/Loader/Loader';

// import { TResetPassword, TSubmit } from '../utils/Types';

// type TState = TResetPassword & TSubmit;

// function ForgotPassword() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         dispatch(authGetUserAction() as any);
//     }, [dispatch]);

//     const submitCb = useCallback((state: TState) => {
//         dispatch(authForgotPasswordAction(state) as any);
//     }, [dispatch]);

//     const { state, onChange, onSubmit } = useForm<TState>({
//         email: ""
//     }, submitCb);

//     const { requestStart, requestError, requestSuccess, userLoggedIn } = useSelector(getAuth);

//     useEffect(() => {
//         if (userLoggedIn) {
//             navigate('/', { replace: true });
//         } else if (state.wasSubmit && requestError) {
//             alert(`[Восстановление пароля] ${requestError}`);
//             dispatch({ type: AUTH_CLEAR_ERRORS });
//         } else if (state.wasSubmit && requestSuccess) {
//             navigate('/reset-password', { replace: true });
//         }
//     }, [dispatch, state.wasSubmit, userLoggedIn, requestError, requestSuccess, navigate]);

//     return (
//         <main className="mt-20 page-container">
//             <form className="page-container-inner" onSubmit={onSubmit}>
//                 {requestStart || userLoggedIn ? <Loader /> : (
//                     <>
//                         <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
//                         <EmailInput extraClass="mb-6" placeholder='Укажите e-mail' name="email" value={state.email} onChange={onChange} />
//                         {requestStart ? <Loader /> : <Button type="primary" extraClass="mb-20" htmlType="submit" disabled={state.email === ""}>Восстановить</Button>}
//                         <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className="page-link" to="/login">Войти</Link></p>
//                     </>)}
//             </form>
//         </main>
//     );
// }

// export default ForgotPassword;

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../hooks/Redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/UseForm';
import { getAuth } from '../services/selectors';
import { authForgotPasswordAction } from '../services/actions/Auth';

import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from '../components/Loader/Loader';
import { TForgotPassword, TSubmit } from '../utils/Types';

type TState = TForgotPassword & TSubmit;

function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitCb = useCallback((state: TState) => {
        dispatch(authForgotPasswordAction(state));
    }, [dispatch]);

    const { state, onChange, onSubmit } = useForm<TState>({
        email: ""
    }, submitCb);

    const { requestStart, requestError, requestSuccess, userLoggedIn } = useSelector(getAuth);

    useEffect(() => {
        if (userLoggedIn) {
            navigate('/', { replace: true });
        } else if (state.wasSubmit && requestSuccess) {
            navigate('/reset-password', { replace: true });
        }
    }, [dispatch, state.wasSubmit, userLoggedIn, requestError, requestSuccess, navigate]);

    return (
        <main className="mt-20 page-container">
            <form className="page-container-inner" onSubmit={onSubmit}>
                <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                <EmailInput extraClass="mb-6" placeholder='Укажите e-mail' name="email" value={state.email} onChange={onChange} />
                {!!requestError && state.wasSubmit && <p className={`mb-2 error-text text text_type_main-default`}>{requestError}</p>}
                {requestStart ? <Loader /> : <Button type="primary" extraClass="mb-20" htmlType="submit" disabled={state.email === ""}>Восстановить</Button>}
                <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link className="page-link" to="/login">Войти</Link></p>
            </form>
        </main>
    );
}

export default ForgotPassword;