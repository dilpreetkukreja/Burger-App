import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    console.log('checkoutSummary props', props);
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes Well!</h1>
            <div>
                <Burger ingredients={props.ingredients}/>
                <Button type='Danger' clicked={props.cancelCheckout}>CANCEL</Button>
                <Button type='Success' clicked={props.continueCheckout}>CONTINUE</Button>
            </div>
        </div>

    );
}

export default checkoutSummary;