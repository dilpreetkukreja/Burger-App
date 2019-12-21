import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import classes from './Orders.css';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        loading: true,
        ordersArray: []
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then(response => {
            console.log(response.data);
            const ordersArray = [];
            for(let orderKey in response.data){
                ordersArray.push({
                    ...response.data[orderKey],
                    id: orderKey
                })
            }
            const ingredients = ordersArray.map(order=>{

            })
            this.setState({loading:false, ordersArray: ordersArray});
        })
        .catch(error =>{this.setState({loading:false})});
    }
    render() {
        
        return (
            <div className={classes.Orders}>
                {this.state.ordersArray.length?
                    this.state.ordersArray.map(order=>{
                        return <Order key={order.id} ingredients={order.ingredients} totalPrice={order.totalPrice}/>
                    })
                    :<h3>No Orders placed yet!</h3> 
                }        
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);