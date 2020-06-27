import React, {useState, useEffect}from 'react';
import classes from './Collection.module.scss';
import ReactImageAppear from 'react-image-appear';
// import * as data from '../../containers/data';

const Collection = (props) => {

    return (
        <div className={classes.Collection} onClick={props.click}>
            <ReactImageAppear 
                loader={props.loader}
                src={`./images/${props.path}`}
                animation="blurIn"
                animationDuration="1s"
                className={classes.img}
            /> 
            <h2>{props.name}</h2>
        </div>
    )
};

export default Collection;

