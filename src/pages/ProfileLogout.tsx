import { useEffect } from 'react';
import { useDispatch, useSelector } from '../hooks/Redux';
import { useNavigate } from 'react-router';
import { authLogoutAction } from '../services/actions/Auth';
import { getAuth } from '../services/selectors';
import { URL_LOGIN } from '../utils/Routes';

import Loader from '../components/Loader/Loader';

function ProfileLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { requestStart, requestError, userLoggedIn } = useSelector(getAuth);

    useEffect(() => {
        if (userLoggedIn) {
            dispatch(authLogoutAction());
        } else {
            navigate(URL_LOGIN, { replace: true });
        }
    }, [dispatch, userLoggedIn, navigate]);

    return (
        <div className="page-container-inner">
            {requestStart && <Loader />}
            {!!requestError && <p className={`error-text text text_type_main-default`}>{requestError}</p>}
        </div>
    );
}

export default ProfileLogout;