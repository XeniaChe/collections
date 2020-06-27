import React, {Fragment, useState, useEffect} from 'react';
import classes from './Main.module.scss';
import * as data from '../data';
import Collections from '../Collections/Collections';
import Assets from '../../components/Assets/Assets';


const Main = (props) => {

    const [colState, setColState] = useState({
        collections: [],
        collectionReady: false,
        mastersReady: false
    });
   
    
    //getting colletions list
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

    // adding masters to collections
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
            mastersReady: true
        })
    };

    //calling adding masters to collections
    useEffect(() => {
        getMastergAsset();
    },[colState.collectionReady])
    
    //rendering collections list
    // let collections = null;
    // if(colState.mastersReady) {
    //     collections = colState.collections.map(el =>{
    //         return <Collection key={el.id} name={el.name} loader={"Homer.jpg"}  path={el.master.path} id={el.id}/>
    //     });
    // }

    return (
        <Fragment>
           <Collections/>
            <Assets/>
        </Fragment>
    )
};

export default Main;
