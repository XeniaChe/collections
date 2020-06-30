import React, {useEffect} from 'react';
import classes from './Select.module.scss';


const Select = (props) => {
  
    return (
        <div>
        <select  name='sort' id='sort' className={classes.Select} onChange={props.sortType} defaultValue='name'>
            <option value='id'>Sort by id</option>
            <option value='name'  >Sort by name</option>
        </select>
        </div>
    )
};

export default Select;


