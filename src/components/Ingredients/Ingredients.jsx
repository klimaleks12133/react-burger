import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { SET_TAB } from '../../services/actions/TabInfo';
import styles from './Ingredients.module.css';
import { BUN, SAUCE, MAIN } from '../../utils/dataName';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredientsTabs(tabChange) {
  const tab = useSelector(state => state.tabInfo.tab);
  const dispatch = useDispatch();

  function change(type) {
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

BurgerIngredientsTabs.propTypes = {
    tabChange: PropTypes.func.isRequired
};

export default BurgerIngredientsTabs;