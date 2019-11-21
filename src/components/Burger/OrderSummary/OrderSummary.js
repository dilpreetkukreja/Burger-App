import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component{
    //to improve performance, we convert it into class so that
    //we can use componentWillUpdate and see if this component update 
    //although this component should be functional component.

    UNSAFE_componentWillUpdate(){
        console.log('[OrderSummary.js] componentWillUpdate')
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey=>{
            return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        })
        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button clicked={this.props.purchaseCancelHandler} type='Danger'>CANCEL</Button>
                <Button clicked={this.props.purchaseContinueHandler} type='Success'>CONTINUE</Button>
            </Aux>
        );
    }
    
}

export default OrderSummary;