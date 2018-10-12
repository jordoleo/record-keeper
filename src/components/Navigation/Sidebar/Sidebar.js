import React from 'react';
import './Sidebar.scss';

import MiddleSidebar from './MiddleSidebar/MiddleSidebar';

const sidebar = (props) => {
    return (
        <div className="Sidebar bg-primary">
            <MiddleSidebar isAuth={props.isAuth}/>
        </div>
    );
};

export default sidebar;