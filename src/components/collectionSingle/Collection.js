import React from 'react';
import classes from './Collection.module.scss';

const Collection = (props) => {
    return (
        <div className={classes.Collection}>
            <img src={`./images/${props.pathName}`} className={classes.img}></img>
            <h2>{props.name}</h2>
        </div>
    )
};

export default Collection;
