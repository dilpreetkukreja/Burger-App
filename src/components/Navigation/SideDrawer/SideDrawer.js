import React from 'react';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = (props) => {
    let SideDrawerClasses = [classes.SideDrawer,classes.Close];
    if(props.show){
        SideDrawerClasses = [classes.SideDrawer,classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.closeSideDrawer}/>
            <div className={SideDrawerClasses.join(' ')}>
                <Logo height="11%"/>
                <nav>
                    <NavigationItems />
                </nav>

            </div>

        </Aux>
        
    );
}

export default sideDrawer;