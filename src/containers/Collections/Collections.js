import React, {useState, useEffect} from 'react';
import classes from './Collections.module.scss';
import * as data from '../data';
import Collection from '../../components/collectionSingle/Collection'


const Collections = (props) => {
    // const collectionsImport = data.collections;
    // const assetsImport = data.assets;

    const [colState, setColState] = useState({
        collections: [],
        // assets: []
        match: [],
        matchReseived: false
    });

    // getting master assets
    const getMatchingAssest = async () => {
        let matchAssets  =  await  Promise.all(colState.collections.map( async el => {
            let res = await data.getAssetsByCollectionAsync(el.id);
            let  match = res.find( el2 => el2.id === el.masterAssetId );
            console.log(match)
            return match;
        }));
        
        setColState({collections: colState.collections,
            match: matchAssets,
            matchReseived: true 
        })
    }
    

    useEffect(()=>{
        const collectionsImport = async() => {
            const response = await  data.getCollectionsAsync();
            setColState({collections: response,
                match: colState.match,
                matchReseived: false })
        };
        collectionsImport();
        getMatchingAssest();
    }, [colState.collections])
    
    //renmdering collections list
    let collections = null;
    if (colState.matchReseived) {
        collections = colState.collections.map(el =>{
            return <Collection key={el.id} name={el.name} />
        });
    
    }

    return (
        <div className={classes.Collections}>
            {collections}
        </div>
    )
};

export default Collections;

//pathName={colState.match[el.id].path} 