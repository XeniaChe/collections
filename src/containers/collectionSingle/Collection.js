import React, { useEffect, useState } from 'react';
import classes from './Collection.module.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
// import Images from '../images';

const Collection = (props) => {

    const [state, setState] = useState({
        tagsArray: [],
        tagsReady: false
    });

    //dynamic style
    let style = [classes.Collection];
    //check if active 
    if (props.clickedID === props.id) {
        style.push(classes.Collection_active)
    };

    //Getting tags array method 
    let tagsArray = []; 
    const getSubtags = (obj, keyCheck) => {
        for (let key in obj) {
            if( key === 'name'){
                tagsArray.push(obj[key]);
            }
            if (keyCheck in obj &&  typeof obj[keyCheck] === 'object') {
                getSubtags(obj[keyCheck], keyCheck);    
                return;
            } 
        };

        setState({
            tagsArray: tagsArray,
            tagsReady: true
        })
    };
   
    //Calling getting tags array method 
    useEffect(() => {
        let tagsImport = props.tags;
        getSubtags(tagsImport, 'subTag');
    },[]);
    
    let tags = null;
    if (state.tagsReady) {
        tags = state.tagsArray.map((el,index) => {
            return (<p key={index}>{el}</p>);
        }); 
    }
    
    return (
        <div className={style.join(' ')} onClick={props.click}>
            <LazyLoadImage
            className={classes.img}
            src={`./images/${props.path}`}
            // // src= {reqiure(`./images/${props.path}`)}
            // // src={Images`:${props.path}`}
            // src={Images.images[`${props.path}`]}
            effect="blur"/>
            <h2>{props.name}</h2>
            <div className={classes.Tags_Box}>
                {tags}
            </div>
        </div>
    )
};

export default Collection;

