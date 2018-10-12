import React from 'react';
import './AbsoluteHeaderTitle.scss';

const absoluteHeaderTitle = (props) => {
    return (
        <div className="AbsoluteHeaderTitle">
            {props.text}
        </div>
    );
};

export default absoluteHeaderTitle;