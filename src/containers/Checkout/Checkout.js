import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
//import queryString from 'query-string';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
//https://teamtreehouse.com/community/what-is-the-difference-between-path-and-url-in-match-prop-of-reactrouter-route-component-react-router-basics
/*  As long as URL search params arrive
synchronously (not coming from an online server, 
in which case componentDidMount is use),
then we can parse query params in Contructor otherwise use 
componentDidMount.
 */
/* it is important to note that if componentDidUpdate() were used 
rather than componentDidMount(), it would be called again after the
nsition to /checkout/contact-data, which would produce an error 
because this.props.location.search would then evaluate to the 
empty string.  */
class Checkout extends Component {
    constructor(props) {
        super(props);
        let query = new URLSearchParams(this.props.location.search);
        let parsedIngredients = {};
        let totalPrice = 0;
        for (let param of query.entries()) {
            // ['salad', '1']
            if (param[0] === 'totalPrice') {
                totalPrice = param[1];
            } else {
                parsedIngredients[param[0]] = +param[1];
            }
        }
        this.state = {
          ingredients: parsedIngredients,
          totalPrice: totalPrice
        };
    } 
    /*state = {
        ingredients: queryString.parse(this.props.location.search)
    }*/
    /*componentWillMount(){
        let searchParams = this.props.location.search;
        const values  = queryString.parse(searchParams);
        //console.log(values);//object
        this.setState({ingredients: values});
    }*/
    componentWillUnmount(){
        console.log('[Checkout.js componentWillUnmount]');
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }
    continueCheckoutHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        console.log('ingredients', this.state.ingredients);    
        return (
            <div>
                <CheckoutSummary cancelCheckout={this.cancelCheckoutHandler} continueCheckout = {this.continueCheckoutHandler} ingredients={this.state.ingredients} />
                <Route path={`${this.props.match.path}/contact-data`} render={()=><ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}/>}/>
            </div>
        );
    }
}

export default Checkout;