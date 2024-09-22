import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/UseForm';
import { getAuth } from '../services/selectors';
import { authLoginAction, authGetUserAction, AUTH_CLEAR_ERRORS } from '../services/actions/Auth';
import { TLoginUser } from '../utils/Api';
import './Page.css';
import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from '../components/Loader/Loader';

type TState = TLoginUser & {
    wasSubmit?: boolean;
}

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        dispatch(authGetUserAction() as any);
    }, [dispatch]);

    const submitCb = useCallback((state: TState) => {
        dispatch(authLoginAction(state) as any);
    }, [dispatch]);

    const { state, onChange, onSubmit } = useForm < TState > ({
        email: "",
        password: ""
    }, submitCb);

    const { requestStart, requestError, userLoggedIn } = useSelector(getAuth);

    useEffect(() => {
        if (userLoggedIn) {
            const { from } = location.state || { from: { pathname: "/" } };
            if (from.pathname === "/profile/logout") {
                from.pathname = "/";
            }
            navigate(from.pathname, { replace: true });
        } else if (state.wasSubmit && requestError) {
            alert(`[Вход] ${requestError}`);
            dispatch({ type: AUTH_CLEAR_ERRORS });
        }
    }, [dispatch, location.state, state.wasSubmit, userLoggedIn, navigate, requestError]);

    return (
        <main className="page-container">
            <form className="page-container-inner" onSubmit={onSubmit}>
                {requestStart || userLoggedIn ? <Loader /> : (
                    <>
                        <h1 className="text text_type_main-medium mb-6">Вход</h1>
                        <EmailInput extraClass="mb-6" name="email" value={state.email} onChange={onChange} />
                        <PasswordInput extraClass="mb-6" name="password" value={state.password} onChange={onChange} />
                        {requestStart ? <Loader /> : <Button type="primary" extraClass="mb-20" htmlType="submit" disabled={state.email === "" || state.password === ""}>Войти</Button>}
                        <p className="text text_type_main-default text_color_inactive mb-4">Вы — новый пользователь? <Link className="page-link" to="/register">Зарегистрироваться</Link></p>
                        <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link className="page-link" to="/forgot-password">Восстановить пароль</Link></p>
                    </>)}
            </form>
        </main>
    );
}

export default Login;