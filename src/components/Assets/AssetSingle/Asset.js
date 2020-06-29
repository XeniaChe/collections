import React from 'react';
import classes from './Asset.module.scss';
// import ReactImageAppear from 'react-image-appear';
import Button from '../../UI/Button/Button';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Asset = (props) => {
    let style =[classes.img];

    let collections = props.collections;
   
    let colIndex = collections.findIndex( el => {
        return el.id === props.parentID;
    });
    if (collections[colIndex].masterAssetId === props.id) {
        style.push(classes.active);
    };
    

    return (
        <div className={classes.Asset}>
            <LazyLoadImage 
                effect="blur"
                src={`./images/${props.path}`}
                className={style.join(' ')}/>
            <p>{props.name}</p>
            <p>{props.id}</p>
            <Button click={props.click}>make master</Button>
        </div>
    )
};

export default Asset;