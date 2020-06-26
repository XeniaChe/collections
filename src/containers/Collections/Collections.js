import React, {useState, useEffect} from 'react';
import classes from './Collections.module.scss';
import * as data from '../data';
import Collection from '../../components/collectionSingle/Collection'


const Collections = (props) => {

    const [colState, setColState] = useState({
        collections: [],
        // assets: []
        // match: [],
        collectionReady: false
    });

    // getting master assets
    const getMastergAsset = async () => {
        let matchingAssets  =  await  Promise.all(colState.collections.map( async el => {
            let res = await data.getAssetByIdAsync(el.masterAssetId);
            return res;
        }));

        ////////with separate match object in state
        // setColState({collections: colState.collections,
        //     match: matchAssets,
        // })

        let collections = [...colState.collections];
        collections.map(el => {
            let masterEl = matchingAssets.find(el2 => el2.collectionId === el.id);
            return el.master = masterEl;
        });
        setColState({
            collections: collections
        })
    }

   
    

    useEffect(()=>{
        ////////with separate match object in state
        // const collectionsImport = async() => {
        //     const response = await  data.getCollectionsAsync();
        //     setColState({collections: response,
        //         match: colState.match,
        //     })
        // };
        // collectionsImport();
        
        const collectionsImport = async() => {
            const response = await  data.getCollectionsAsync();
            setColState({collections: response,
                // match: colState.match,  //with separate match object in state
                collectionReady: true
            })
        };
        collectionsImport();
        

    }, []);

    useEffect(() => {
        getMastergAsset();
    },[colState.collectionReady])
    
    //renmdering collections list
    let collections = null;
        collections = colState.collections.map(el =>{
            return <Collection key={el.id} name={el.name} pathName={"Homer.jpg"}/>
    });
    
   

    return (
        <div className={classes.Collections}>
            {collections}
        </div>
    )
};

export default Collections;

//pathName={colState.match[el.id].path} 
//path={el.master.path}