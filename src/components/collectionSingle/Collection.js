import React from 'react';
import classes from './Collection.module.scss';
import ReactImageAppear from 'react-image-appear';

const Collection = (props) => {
    return (
        <div className={classes.Collection}>
            <ReactImageAppear 
                loader={props.loader}
                src={`./images/${props.path}`}
                animation="zoomIn"
                animationDuration="1s"
                className={classes.img}
            /> 
            <h2>{props.name}</h2>
        </div>
    )
};

export default Collection;
