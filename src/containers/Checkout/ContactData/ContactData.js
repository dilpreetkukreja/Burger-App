import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';

class ContactData extends Component {
    state = {
        name: '',
        email:'',
        address: {
            street:'',
            postalCode:''
        },
        loading: false
    }
    orderHandler = (e) => {
        e.preventDefault();
        console.log('ContactData.js props:',this.props);
        this.setState({loading: true});
        //console.log('clicked');
        //alert('You Continue!');
        let data = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
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
        .then(response => {
            this.setState({loading:false});
            this.props.history.push('/');
        })
        .catch(error =>{this.setState({loading:false})});

    }
    render() {
        let form =(
                <form>
                    <input className={classes.Input} type='text' placeholder='Enter Name' />
                    <input className={classes.Input} type='email' placeholder='Enter Email' />
                    <input className={classes.Input} type='text' placeholder='Enter Street' />
                    <input className={classes.Input} type='text' placeholder='Enter Postal Code' />
                    <Button type="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>);
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);