import React from 'react';
import Backdrop from '../../../hoc/Backdrop/Backdrop';
import './Loading.scss';

const loading = (props) => {
    return (
        <Backdrop>
            <div className="loader">Loading...</div>
        </Backdrop>
    );
};

export default loading;
