import React from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../..//hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
class BurgerBuilder extends React.Component{
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null

    }
     
    updatePurchasing = () => {
        this.setState({purchasing: true});
    }
    purchaseCancelHandler =() =>{
        this.setState({purchasing: false});
    }
    purchaseContinueHandler = ()=> {
        let paramsArray = [];
        let ingredients = this.state.ingredients;
        for(let i in ingredients){
            paramsArray.push(`${encodeURIComponent(i)}=${encodeURIComponent(ingredients[i])}`);
        }
        paramsArray.push('totalPrice='+this.state.totalPrice);
        let paramsString = paramsArray.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: `?${paramsString}`
        });
        /*this.setState({loading: true});
        console.log('clicked');
        //alert('You Continue!');
        let data = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Dilpreet',
                address: {
                    street: 'testStree',
                    zipcode: '1234',
                    country: 'US'
                },
                email: 'test@test.com'
            },
            delieveryMethod: 'fastest'
        }
        axios.post('/orders.json', data)
        .then(response => {this.setState({loading:false, purchasing: false})})
        .catch(error =>{this.setState({loading:false, purchasing: false})});*/
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
    componentDidMount(){
        axios.get('/ingredients.json')
        .then(response=>{
            //console.log(response);
            const ingredients = response.data;
            let price = this.state.totalPrice;
            for (let ingredient in ingredients) {
                price += INGREDIENT_PRICES[ingredient] * ingredients[ingredient];
            }
            let purchasable=false;
            //check if any of ingredients are already present when access from database, in that
            //case totalPrice > 4 and we should show 'Order Now' button yellow
            if(price>4){
                purchasable=true;
            }
            this.setState({
                ingredients: ingredients,
                totalPrice: price,
                purchasable: purchasable
            });
        })
        .catch(error=> {
            console.log("Error Accessing ingredients from database");
            this.setState({error:true});
        });
        
    }

   
    render(){
        console.log('purchasable', this.state.purchasable);
        let disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo){
            disabledInfo[key] =  disabledInfo[key]===0;
        }
        console.log('disabledInfo',disabledInfo);
        let orderSummary = null;
        let burger = this.state.error?<p style={{textAlign:'center'}}>Error Accessing ingredients from database!</p>: <Spinner />;
        if(this.state.ingredients){
            burger = (
                <Aux>
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
            orderSummary = (
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    totalPrice = {this.state.totalPrice}
                    purchaseCancelHandler={this.purchaseCancelHandler} 
                    purchaseContinueHandler ={this.purchaseContinueHandler}/>
            );
        }
        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing}
                   modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger} 
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);