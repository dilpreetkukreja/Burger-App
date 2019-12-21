import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css'

const buildControls = (props) => {
    const ingredientInfo = [
        {label: 'Meat', type: 'meat'},
        {label: 'Cheese', type: 'cheese'},
        {label: 'Salad', type: 'salad'},
        {label: 'Bacon', type: 'bacon'},
    ];

    let ingredientArr= ingredientInfo.map(item=>{
        return  <BuildControl key={item.type} 
                              type={item.type}
                              label = {item.label}
                              add = {props.add}
                              remove = {props.remove}
                              disabledInfo = {props.disabledInfo[item.type]}/>
    })
  return (
        <div className={classes.BuildControls}>
            <div>Current (base) Price: <strong>{props.totalPrice.toFixed(2)}</strong></div>
            <p>INGREDIENTS</p>
            {ingredientArr}
            <button className={classes.OrderButton} 
                    disabled={!props.purchasable}
                    onClick = {props.updatePurchasing}>
                        ORDER NOW
            </button>
        </div>
    );
}

export default buildControls;