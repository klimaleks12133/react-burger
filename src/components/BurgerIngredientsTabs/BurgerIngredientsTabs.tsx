import { FC } from 'react';
import { useDispatch, useSelector } from '../../hooks/Redux';
import { SET_TAB } from '../../services/actions/TabInfo';
import { getTab } from '../../services/selectors';

import styles from './BurgerIngredientsTabs.module.css';
import { BUN, SAUCE, MAIN, names } from '../../utils/DataName';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

type TProps = {
    tabChange: (tab: string) => void;
};

const BurgerIngredientsTabs: FC<TProps> = ({ tabChange }) => {
    const tab = useSelector(getTab);
    const dispatch = useDispatch();

    function change(type: string) {
        dispatch({ type: SET_TAB, tab: type });
        tabChange(type);
    }

    return (
        <div className={`${styles.tabs} mb-2`}>
            <Tab value={BUN} active={tab === BUN} onClick={change}>{names[BUN]}</Tab>
            <Tab value={SAUCE} active={tab === SAUCE} onClick={change}>{names[SAUCE]}</Tab>
            <Tab value={MAIN} active={tab === MAIN} onClick={change}>{names[MAIN]}</Tab>
        </div>
    );
}

export default BurgerIngredientsTabs;