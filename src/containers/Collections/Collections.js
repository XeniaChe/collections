import React, {Fragment, useState, useEffect} from 'react';
import classes from './Collections.module.scss';
import * as data from '../data';
import Collection from '../../components/collectionSingle/Collection';
import Assets from '../../components/Assets/Assets';


const Collections = (props) => {

    const [colState, setColState] = useState({
        collections: [],
        collectionReady: false,
        mastersReady: false,
    });

    const [assetsState, setAssetsState] = useState({
        clickedID: null, 
        assets: [],
        ready: false
    });

    const [makeMasterState, setMakeMaster] = useState({
        buttonClicked: false
    })
   
    
    //Getting  colletions list. 
    useEffect(()=>{
        const collectionsImport = async() => {
            const response = await  data.getCollectionsAsync();
            setColState({collections: response,
                collectionReady: true,
                mastersReady: false
            })
        };
        collectionsImport();
    }, []);

    // Getting and adding each col-tion's INITIAL master. 
    const getMastergAsset = async () => {
        let matchingAssets  =  await  Promise.all(colState.collections.map( async el => {
            let res = await data.getAssetByIdAsync(el.masterAssetId);
            return res;
        }));

        let collections = [...colState.collections];
        collections.map(el => {
            let masterEl = matchingAssets.find(el2 => el2.collectionId === el.id);
            return el.master = masterEl;
        });
        setColState({
            collections: collections,
            // collectionReady: colState.collectionReady,
            mastersReady: true
        })
    };

    //Calling adding INITIAL masters to collections. 
    useEffect(() => {
        getMastergAsset();
    },[colState.collectionReady])



    
    //get clicked collection's assets
    const getAssets = async (id) => {
        let assetsResult = await data.getAssetsByCollectionAsync(id);

        setAssetsState({
            clickedID: id,
            assets: assetsResult, 
            ready: true
        })
    };

    // Collection on Click.  
    const getCollID = (id) => {
        //get the ID
        let gotId = id;
        // setAssetsState({
        //     clickedID: gotId
        // });
        
        //get the assets
        getAssets(gotId);       
    };
    
    //rendering collections list
    let collections = null;
    if(colState.mastersReady) {
        collections = colState.collections.map(el =>{
            return <Collection key={el.id} name={el.name}  path={el.master.path} id={el.id} click={() =>getCollID(el.id)}/>
        });
    };


    //make master Button
    const makeMaster = (id) => {
        let clicked = makeMasterState.buttonClicked;
        let clickedId = id;
        console.log(clickedId)
        setMakeMaster({
            buttonClicked: !clicked,
            newMastersID: clickedId
        });

        //rewriting new masters id in collection

        //getting new masters object
        // getMastergAsset();
    };

    return (
        <Fragment>
            <div className={classes.Collections}>
                {collections}
            </div>
            {assetsState.ready ?  <Assets list={assetsState.assets} id={assetsState.clickedID} click={makeMaster}/> : null}
        </Fragment>
    )
};

export default Collections;
