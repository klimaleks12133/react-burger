import React from 'react';
import data from '../../utils/data.js';
import styles from './IngredientsList.module.css';
import Ingredients from "../Ingredients/Ingredients.jsx";

type listTypes = 'bun' | 'sauce' | 'main'
const typeNames = {
    'bun':'Булки',
    'sauce':'Соусы',
    'main':'Начинки'
};

interface IngredientsListProps {
    listType: listTypes;
}

const IngredientsList: React.FC<IngredientsListProps> = ({listType}) => {
    return (
       <>
           <p className="text text_type_main-medium">
               {typeNames[listType]}
           </p>
           <div className={styles.ingredients__list}>
               {data.map((item) => {
                   return (item.type === listType) ?
                       <Ingredients key={item._id} image={item.image} name={item.name} price={item.price}/> : null
               })}
           </div>
       </>
    );
}

export default IngredientsList;