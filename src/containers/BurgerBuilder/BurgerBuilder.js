import React from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
class BurgerBuilder extends React.Component{
    state = {
        ingredients:{
            meat: 0,
            salad: 0,
            cheese: 0,
            bacon: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false

    }
     
    updatePurchasing = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler =() =>{
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = ()=>{
        alert('You Continue!');
    }
   
    updatePurchasable(){
        this.setState(prevState =>{
            let ingredientsCopy = prevState.ingredients;
            let ingredientsSum = Object.values(ingredientsCopy).reduce((sum, elem)=>{
                return sum+elem;
            },0);
            console.log('ingredientSum', ingredientsSum);
            if(ingredientsSum>0)
                return {purchasable:true};
            else
            return {purchasable:false};
        })
    }

    addHandler = (type) => {
        this.setState(prevState=>{
            let ingredientsCopy = {...prevState.ingredients};
            let prevCount = ingredientsCopy[type];
            ingredientsCopy[type] = prevCount+1;
            let updatedTotalPrice = prevState.totalPrice + INGREDIENT_PRICES[type];
            return {totalPrice: updatedTotalPrice, ingredients: ingredientsCopy};
        }, ()=> this.updatePurchasable());
    }

    removeHandler = (type) => {
        /*if(prevCount===0){
          return;
        }*/
       
        this.setState(prevState=>{
            let ingredientsCopy = {...prevState.ingredients};
            let prevCount = ingredientsCopy[type];
            ingredientsCopy[type] = prevCount-1;
            let updatedTotalPrice = prevState.totalPrice - INGREDIENT_PRICES[type];
            return {totalPrice: updatedTotalPrice, ingredients: ingredientsCopy};
        }, ()=> this.updatePurchasable());
 
    }

   
    render(){
        console.log('purchasable', this.state.purchasable);
        let disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo){
            disabledInfo[key] =  disabledInfo[key]===0;
        }
        console.log('disabledInfo',disabledInfo);
        return (
            <Aux>
                hello
                <Modal show={this.state.purchasing}
                    purchaseCancelHandler={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        totalPrice = {this.state.totalPrice}
                        purchaseCancelHandler={this.purchaseCancelHandler} 
                        purchaseContinueHandler ={this.purchaseContinueHandler}/>
                </Modal>
                <div>
                    <Burger ingredients={this.state.ingredients}/>
                </div>
                <div>
                    <BuildControls totalPrice = {this.state.totalPrice}
                                   add = {this.addHandler}
                                   remove = {this.removeHandler}
                                   disabledInfo = {disabledInfo}
                                   purchasable = {this.state.purchasable}
                                   updatePurchasing = {this.updatePurchasing}/>
                </div>
            </Aux>
        );
    }
}

export default BurgerBuilder;