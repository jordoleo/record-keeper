import {Component} from 'react';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return null;
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onLogout: () => dispatch(actions.authLogout())
    };
};

export default connect(null, mapDispatchToProp)(Logout);