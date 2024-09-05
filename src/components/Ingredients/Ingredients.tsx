import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_TAB } from '../../services/actions/TabInfo';
import styles from './Ingredients.module.css';
import { BUN, SAUCE, MAIN } from '../../utils/DataName';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { getTab } from '../../services/selectors';

type TProps = {
  tabChange: (tab: string) => void;
};

const Ingredients: FC<TProps> = ({ tabChange }) => {
  const tab = useSelector(getTab);
  const dispatch = useDispatch();

  function change(type: string) {
    dispatch({ type: SET_TAB, tab: type });
    tabChange(type);
  }

  return (
    <div className={styles.tabs}>
      <Tab value="Булки" active={tab === BUN} onClick={change}>
        Булки
      </Tab>
      <Tab value="Соусы" active={tab === SAUCE} onClick={change}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={tab === MAIN} onClick={change}>
        Начинки
      </Tab>
    </div>
  );
}

export default Ingredients;