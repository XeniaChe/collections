import React from 'react';
import classes from './Asset.module.scss';
import ReactImageAppear from 'react-image-appear';
import Button from '../../UI/Button/Button';

const Asset = (props) => {
    let active = false;
    let style =[classes.img];
    if (active) {
        style.push(classes.active);
    }

    return (
        <div className={classes.Asset}>
            {/* <figure> */}
                <ReactImageAppear 
                    src={`./images/${props.path}`}
                    animation="blurIn"
                    animationDuration="2s"
                    className={style.join(' ')}
                /> 

            {/* </figure> */}
            <p>{props.name}</p>
            <p>{props.id}</p>
            <Button click={props.click}>make master</Button>
        </div>
    )
};

export default Asset;