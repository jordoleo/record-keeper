import React from 'react';
import './MiddleSidebarItem.scss';
import {NavLink} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const middleSidebarItem = (props) => {
    const classes = ['fas'];
    classes.push(props.iconName);
    return (
        <NavLink to={props.path}>
            <div className="MiddleSidebarItem">
                <div className="Item Icon">
                    <FontAwesome name={props.iconName}/>
                </div>
                <div className="Item LinkTitle">{props.title}</div>
            </div>
        </NavLink>
    );
};

export default middleSidebarItem;