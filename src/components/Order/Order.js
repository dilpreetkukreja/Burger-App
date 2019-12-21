import React from 'react';
import classes from './Order.css';

const order= (props) => {
    let ingredientArr = [];
    for(let ingredient in props.ingredients){
        ingredientArr.push(<span style={{display:'inline-block', border:'1px solid #ccc', margin:'5px', padding:'5px'}}>
                                {`${ingredient} (${props.ingredients[ingredient]})`}
                          </span>);
    }
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientArr}</p>
            <p>Total Price: <strong>{`USD ${Number.parseFloat(props.totalPrice).toFixed(2)}`}</strong></p>
        </div>
    );
}

export default order;