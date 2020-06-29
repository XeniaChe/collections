import React, {useState, useEffect}from 'react';
import classes from './Collection.module.scss';
// import ReactImageAppear from 'react-image-appear';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Collection = (props) => {

    return (
        <div className={classes.Collection} onClick={props.click}>
            <LazyLoadImage
            className={classes.img}
            src={`./images/${props.path}`}
            effect="blur"/>
            <h2>{props.name}</h2>
        </div>
    )
};

export default Collection;

