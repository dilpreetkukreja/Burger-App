import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component{
    state = {
        showSideDrawer: false
    }

    sideDrawerToggle = () => {
        console.log('toggle');
        this.setState(prevState =>{
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }
    SideDrawerCancelHandler = () =>{
        this.setState({showSideDrawer: false})
    }
    render(){
        return (
            <Aux>
                <SideDrawer show={this.state.showSideDrawer} closeSideDrawer={this.SideDrawerCancelHandler}/>
                <Toolbar toggle={this.sideDrawerToggle} />
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }   
}

export default Layout;