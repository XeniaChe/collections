import React, {useEffect} from 'react';
import classes from './Assets.module.scss';
import Asset from './AssetSingle/Asset';

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
            {assest}
        </div>
    )
};

export default Assets;