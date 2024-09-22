import { useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from '../services/selectors';
import { authGetUserAction } from '../services/actions/Auth';
import Loader from './Loader/Loader';

type TProps = {
    element: React.ReactElement
}

const ProtectedRoute: FC<TProps> = ({ element }) => {
    const { userLoggedIn, requestStart, requestError } = useSelector(getAuth);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userLoggedIn) {
            dispatch(authGetUserAction() as any);
        }
    }, [userLoggedIn, dispatch]);

    useEffect(() => {
        if (requestError) {
            navigate("/login", { replace: true, state: { from: location } });
            return undefined;
        }
    }, [requestError, navigate, location]);

    return !userLoggedIn || requestStart ? <Loader /> : element;
}

export default ProtectedRoute;