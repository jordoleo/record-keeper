import React from 'react';
import {Route, withRouter, Switch, Redirect} from 'react-router-dom';
import LoginForm from '../../../../containers/Form/LoginForm/LoginForm';
import RegisterForm from '../../../../containers/Form/RegisterForm/RegisterForm';
import Manga from '../../../../containers/Manga/Manga';
import MangaList from '../../../../containers/MangaList/MangaList';
import Logout from '../../../../containers/Auth/Logout/Logout';
import './Content.scss';
import AbsoluteHeaderTitle from '../../../UI/AbsoluteHeaderTitle/AbsoluteHeaderTitle';
import Footer from '../../../UI/Footer/Footer';

const content = (props) => {
    let contentClasses = ['Content', 'Content-flex'];
    let header = <AbsoluteHeaderTitle text="Welcome to Record Keeper"/>;
    let routes = (

        <Switch>
            <Route path="/login" component={LoginForm}/>
            <Route path="/register" component={RegisterForm}/>
            <Redirect to="/login"/>
        </Switch>
    );

    if(props.isAuth) {
        header = null;
        contentClasses = ['Content'];
        routes = (
            <Switch>
                <Route path="/search" component={Manga}/>
                <Route path="/list" component={MangaList}/>
                <Route path="/logout" component={Logout}/>
                <Redirect to="/search"/>
            </Switch>
        );
    }

    return (
        <div className={contentClasses.join(' ')}>
            {header}
            {routes}
            <Footer/>
        </div>
    );
};

export default withRouter(content);