import { useMemo, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_DISPLAYED_INGREDIENT } from '../../services/actions/Ingredient';
import { SET_TAB } from '../../services/actions/TabInfo';
import styles from './BurgerIngredients.module.css';
import { BUN, SAUCE, MAIN, names } from '../../utils/DataName';
import Ingredients from '../Ingredients/Ingredients';
import IngredientsItem from '../IngredientsItem/IngredientsItem';
import { useNavigate } from 'react-router';
import { getData, getDisplayedIngredient, getIngredients, getTab } from '../../services/selectors';

function BurgerIngredients() {
    const displayedIngredient = useSelector(getDisplayedIngredient);
    const { data } = useSelector(getData);
    const tab = useSelector(getTab);
    const { bun, ingredients } = useSelector(getIngredients);

    const countData = useMemo(() => {
        const res = {};
        if (bun) {
            res[bun._id] = 2;
        }
        for (let item of ingredients) {
            if (!(item._id in res)) {
                res[item._id] = 0;
            }
            res[item._id]++;
        }
        return res;
    }, [bun, ingredients]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const groups = useMemo(() => {
        let res = {};
        res[BUN] = data.filter(i => i.type === BUN);
        res[SAUCE] = data.filter(i => i.type === SAUCE);
        res[MAIN] = data.filter(i => i.type === MAIN);
        return res;
    }, [data]);

    const headers = {};
    headers[BUN] = useRef(null);
    headers[SAUCE] = useRef(null);
    headers[MAIN] = useRef(null);

    function tabChange(value) {
        headers[value].current.scrollIntoView({ behavior: "smooth" });
    }

    function handleScroll(e) {
        const pos = e.currentTarget.scrollTop;
        const distance = [];
        for (let h of Object.values(headers)) {
            const hPos = h.current.offsetTop;
            distance.push(Math.abs(pos - hPos));
        }
        const min = Math.min(...distance);
        const minIndex = distance.indexOf(min);
        const newTab = Object.keys(headers)[minIndex];

        if (tab !== newTab) {
            dispatch({ type: SET_TAB, tab: newTab });
        }
    }

    const hideDialog = useCallback((e) => {
        navigate('/', { replace: true });
        dispatch({ type: SET_DISPLAYED_INGREDIENT, item: null });
        e.stopPropagation();
    }, [dispatch, navigate]);

    return (
        <section className={styles.section}>
            <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
            <Ingredients tabChange={tabChange} />

            <div className={styles.list} onScroll={handleScroll}>
                {[BUN, SAUCE, MAIN].map((type, typeIndex) => (
                    <div key={typeIndex}>
                        <h2 className="text text_type_main-medium mt-8" ref={headers[type]}>{names[type]}</h2>
                        <ul className={styles.group__content}>
                            {groups[type].map((item) => (
                                <IngredientsItem key={item._id} item={item} count={countData[item._id]} />
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BurgerIngredients;