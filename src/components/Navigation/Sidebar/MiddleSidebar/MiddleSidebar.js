import React from 'react';
import MiddleSidebarItem from './MiddleSidebarItem/MiddleSidebarItem';
import './MiddleSidebar.scss';


const middleSidebar = (props) => {
    let content = (
        <div className="MiddleSidebar">
            <MiddleSidebarItem title="Login" iconName="plus" path="/login"/>
            <MiddleSidebarItem title="Register" iconName="sign-in-alt" path="/register"/>
        </div>
    );

    if(props.isAuth) {
        content = (
            <div className="MiddleSidebar">
                <MiddleSidebarItem title="Search" iconName="search" path="/search"/>
                <MiddleSidebarItem title="List" iconName="book" path="/list"/>
                <hr/>
                <MiddleSidebarItem title="Logout" iconName="sign-out-alt" path="/logout"/>
            </div>
        );
    }

    return content;
};

export default middleSidebar;