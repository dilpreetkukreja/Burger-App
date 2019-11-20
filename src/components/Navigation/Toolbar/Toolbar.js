import React from 'react';
import Logo from '../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../Menu/Menu';
import classes from './Toolbar.css'

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
           <Menu toggle={props.toggle}/>
           <Logo height={'80%'}/>
           <nav>
               <NavigationItems />
           </nav>
        </header>
    );
}

export default toolbar;