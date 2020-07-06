import React from 'react';
import classes from './Asset.module.scss';
import Button from '../../UI/Button/Button';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


const Asset = (props) => {
    let styleImage =[classes.img];
    let disable = false;
    let styleBox = [classes.Asset]

    let collections = props.collections;
   
    let colIndex = collections.findIndex( el => {
        return el.id === props.parentID;
    });

    if (collections[colIndex].masterAssetId === props.id) {
        styleImage.push(classes.active);
        disable = true;
        styleBox.push(classes.Box_active)
    };
    
    const sourceImage = require(`../../../images/${props.path}` ); 

    return (
        <div className={styleBox.join(' ')}>
            <LazyLoadImage 
                effect="blur"
                src={sourceImage}
                className={styleImage.join(' ')}/>
            <p>{props.name}</p>
            <p>{props.id}</p>
            <Button click={props.click} disable={disable}>make master</Button>
        </div>
    )
};

export default Asset;