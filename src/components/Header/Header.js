import React from 'react';
import classes from './Header.module.scss';

const Header = (props) => {
    return (
        <div className={classes.Header}>
            <h3> your collections</h3>
        </div>
    )
};

export default Header;