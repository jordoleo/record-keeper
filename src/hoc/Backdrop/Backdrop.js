import React from 'react';
import './Backdrop.scss';

const backdrop = (props) => {
    return (
        <div className="Backdrop" onClick={props.onClick}>
            {props.children}
        </div>
    );
};

export default backdrop;