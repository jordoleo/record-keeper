import React, {Component} from 'react';
import Sidebar from '../../components/Navigation/Sidebar/Sidebar';
import Content from "../../components/UI/Layout/Content/Content";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Loading from '../../components/UI/Loading/Loading';
import Modal from '../../components/UI/Modal/Modal';
import {authInitSaga, modalClose} from '../../store/actions/index';

class Layout extends Component {

    componentDidMount() {
        this.props.onAuthInit();
    }

    modalClosedHandler = (event) => {
        this.props.onModalClosed();
    };

    render() {
        let loading = null;
        let modal = null;
        if(this.props.isLoading) {
            loading = <Loading/>
        }
        if(this.props.showModal){
            modal = <Modal style={this.props.style} modalClosedHandler={this.modalClosedHandler} header={this.props.modalData.header} body={this.props.modalData.body} additionalStyle={this.props.modalData.additionalStyle}/>
        }

        return (
            <div>
                <Sidebar
                    isAuth={this.props.isAuth}/>
                <Content
                    isAuth={this.props.isAuth}/>
                {loading}
                {modal}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.get('token') !== null,
        isLoading: state.auth.get('loading') || state.anilist.get('loading') || state.manga.get('loading'),
        showModal: state.modal.get('show'),
        modalData: state.modal.get('modalData').toJSON(),
        style: state.modal.get('style')
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthInit: () => dispatch(authInitSaga()),
        onModalClosed: () => dispatch(modalClose())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));