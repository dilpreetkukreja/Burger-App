import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => {

    return (
        <div className={classes.BuildControl}>
            <div>{props.label}</div>
            <button onClick={()=> {props.remove(props.type)}}
                    disabled = {props.disabledInfo}>
                Less
            </button>
            <button onClick={()=> {props.add(props.type)}}>More</button>
        </div>
    );
}

export default buildControl;