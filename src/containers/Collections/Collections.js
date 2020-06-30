import React, {Fragment, useState, useEffect} from 'react';
import classes from './Collections.module.scss';
import * as data from '../data';
import Collection from '../collectionSingle/Collection';
import Assets from '../../components/Assets/Assets';



const Collections = (props) => {

    const [colState, setColState] = useState({
        collections: [],
        collectionReady: false,
        mastersReady: false,
    });

    const [assetsState, setAssetsState] = useState({
        clickedColID: null, 
        assets: [],
        ready: false
    });

    
    //Getting  colletions list. 
    useEffect(()=>{
        const collectionsImport = async() => {
            const response = await  data.getCollectionsAsync();
            setColState({
                collections: response,
                collectionReady: true,
                mastersReady: false
            })
        };
        collectionsImport();
    },[]);

    // Getting and adding each col-tion's INITIAL master. 
    const getMastergAsset = async () => {
        let matchingAssets  =  await  Promise.all(colState.collections.map( async el => {
            let res = await data.getAssetByIdAsync(el.masterAssetId);
            return res;
        }));
        
        //adding master object to each col-tion 
        let collections = [...colState.collections];
        collections.map(el => {
            let masterEl = matchingAssets.find(asset => asset.collectionId === el.id);
            return el.master = masterEl;
        });

        setColState({
            collections: collections,
            collectionReady: colState.collectionReady,
            mastersReady: true
        })
    };

    // const getTagsArray = () => {
    //     const getSubtags = (obj, key2) => {
    //         let names = [];
    //         for ( let key in obj) {
    //             if( key === 'name'){
    //                 names.push(obj.name);
    //             }
    //             if (key2 in obj ) {
    //                 // console.log(obj[key2].name)
    //                 getSubtags(obj[key2], key2);    
    //             } 
    //         }
    //         return names
    //     };
    //     let collections = [...colState.collections];

    //     collections.map(el => {
    //         let tagsArray = getSubtags(el.tags, 'subTag');
    //         console.log(tagsArray)
    //         return  el.tagsArray = tagsArray;
    //     });
    //     setColState({
    //         collections: collections,
    //         collectionReady: colState.collectionReady,
    //         mastersReady: false,
    //     })
        
    //     // getSubtags(tags, 'subTag');
    // };

    //Calling adding INITIAL masters to collections. 
    useEffect(() => {
        // getTagsArray();
        getMastergAsset();
    },[colState.collectionReady])


 

    //Sorting by NAME
    const SortByName = (a, b) => {
        let aFixed = a.name.toUpperCase(); 
        let bFixed = b.name.toUpperCase(); 
        if (aFixed<bFixed)  {
            return -1}
        else if (aFixed>bFixed){ 
            return 1
        } 
        return 0;
    };
    //Sorting by ID
    const SortByID = (a, b) => {
        return a.id - b.id; 
    };


    // Sorting type changing Handler
    const sortingTypeHandler = (event) => {
        let sortType = event.target.value; 

        let assetsClone = [...assetsState.assets];

        const sortBy = (type) => {
            if (type === 'id') {
                assetsClone.sort(SortByID)
            } else {
                assetsClone.sort(SortByName)
            };

            setAssetsState({
                clickedColID: assetsState.clickedColID,
                assets: assetsClone,
                ready: true
            });
        };
        sortBy(sortType);
    };

  
    //Get clicked collection's assets
    const getAssets = async (id) => {
        let assetsResult = await data.getAssetsByCollectionAsync(id);
        let aesstesSorted = assetsResult.sort(SortByName);

        setAssetsState({
            clickedColID: id,
            assets: aesstesSorted,
            ready: true
        })

    };
 
    // Collection on Click Handler.  
    const getCollIDHandler = (id) => {
        //get the ID
        let gotId = id;
        
        //get the assets
        getAssets(gotId);       
    };
    

    //Make master Button Handler
    const makeMasterHandler = (id) => {
        let clickedId = id;

        //find actual working collection 
        let collectionIndex = colState.collections.findIndex( el => {
            return el.id === assetsState.clickedColID
        });
                
        //getting new masters object
        const  newMaster = async () => {
            let response=  await data.getAssetByIdAsync(clickedId);

            let collections = [ ...colState.collections];
            collections[collectionIndex].master = response;
            collections[collectionIndex].masterAssetId = clickedId;

            setColState({
                collections: collections,
                collectionReady:colState.collectionReady,
                mastersReady:colState.mastersReady,
            });

        };
        newMaster();        
    };

    //rendering collections list
    let collections = null;
    if(colState.mastersReady) {
        collections = colState.collections.map(el =>{
            return <Collection key={el.id} name={el.name}  path={el.master.path} id={el.id} 
                    click={() =>getCollIDHandler(el.id)}
                    clickedID={assetsState.clickedColID}
                    tags={el.tags}
                    />
        });
    };


    return (
        <Fragment>
            <div className={classes.Collections}>
                <p>all collections </p>
                {collections}
            </div>
            {assetsState.ready ?  <Assets list={assetsState.assets} 
                                        click={makeMasterHandler}
                                        collections={colState.collections}
                                        parentID={assetsState.clickedColID}
                                        sortType={sortingTypeHandler}/> : null}
        </Fragment>
    )
};

export default Collections;
