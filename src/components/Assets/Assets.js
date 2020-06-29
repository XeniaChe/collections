import React from 'react';
import classes from './Assets.module.scss';
import Asset from './AssetSingle/Asset';
import Select from '../UI/Select/Select';

const Assets = (props) => {
    let assetsList = props.list;

    let assest = assetsList.map( el => {
        return <Asset path={el.path} name={el.name} id={el.id} key={el.id} 
                        click={()=>props.click(el.id)}
                        collections={props.collections}
                        assetsList ={props.list}
                        parentID={props.parentID}
                />
    });

    return (
        <div className={classes.Assets}>
            <div className={classes.Header_Box}>
                <Select sortType={props.sortType}/>
                <p className={classes.Header}>assets</p>
            </div>
            {assest}
        </div>
    )
};

export default Assets;