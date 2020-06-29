import React from 'react';
import classes from './Select.module.scss';

const Select = (props) => {
    return (
        <div>

        {/* <label htmlFor='sort'> sort by</label> */}
        <select  name='sort' id='sort' className={classes.Select} onChange={props.sortType}>
            <option value='name'>Sort by name</option>
            <option value='id'>Sort by id</option>
        </select>
        </div>
    )
};

export default Select;