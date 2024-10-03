import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../hooks/Redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/UseForm';
import { getAuth } from '../services/selectors';
import { authRegisterAction } from '../services/actions/Auth';
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import Loader from '../components/Loader/Loader';
import { TRegisterUser, TSubmit } from '../utils/Types';

type TState = TRegisterUser & TSubmit;

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitCb = useCallback((state: TState) => {
        dispatch(authRegisterAction(state));
    }, [dispatch]);

    const { state, onChange, onSubmit } = useForm<TState>({
        name: "",
        email: "",
        password: ""
    }, submitCb);

    const { requestStart, requestError, userLoggedIn } = useSelector(getAuth);

    useEffect(() => {
        if (userLoggedIn) {
            navigate("/", { replace: true });
        }
    }, [dispatch, userLoggedIn, navigate]);

    return (
        <main className="mt-20 page-container">
            <form className="page-container-inner" onSubmit={onSubmit}>
                {requestStart ? <Loader /> : (
                    <>
                        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
                        <Input placeholder="Имя" extraClass="mb-6" name="name" value={state.name} onChange={onChange} />
                        <EmailInput extraClass="mb-6" name="email" value={state.email} onChange={onChange} />
                        <PasswordInput extraClass="mb-6" name="password" value={state.password} onChange={onChange} />
                        {!!requestError && state.wasSubmit && <p className={`mb-2 error-text text text_type_main-default`}>{requestError}</p>}
                        <Button type="primary" extraClass="mb-20" htmlType="submit" disabled={state.name === "" || state.email === "" || state.password === ""}>Зарегистрироваться</Button>
                        <p className="text text_type_main-default text_color_inactive mb-4">Уже зарегистрированы? <Link className="page-link" to={"/login"}>Войти</Link></p>
                    </>)}
            </form>
        </main>
    );
}

export default Register;