import React from 'react';
import './HeaderTitle.scss';

const headerTitle = (props) => {
    return (
        <div className="HeaderTitle">
            <legend>{props.text}</legend>
        </div>
    );
};

export default headerTitle;