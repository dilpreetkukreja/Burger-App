import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {
    /*et array1 = [undefined, undefined];
    let array2 = new Array(2);
    console.log(Object.keys(array1));//[0,1]
    console.log(Object.keys(array2));//[]
    array1.forEach(item=>console.log("Hi"));//Hi Hi
    array2.forEach(item=>console.log("Hello"));// nothing prints*/
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {//+ can be added(Array(+props.ingredients[igKey])]),to convert string into number while parsing queryParams in router
        return [...Array(props.ingredients[igKey])].map((_,i)=>{
            return <BurgerIngredients key={igKey+i} type={igKey} />
        })
    }).reduce((arr,elem)=>{
        return arr.concat(elem);
    },[]);
    console.log(transformedIngredients);
    if(transformedIngredients.length===0)
        transformedIngredients = <p>Please start adding ingredients</p>
   
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {transformedIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
}
export default burger;