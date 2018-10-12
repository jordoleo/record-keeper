import React, {Component} from 'react';
import Form from 'react-validation/build/form';
import Button from 'react-validation/build/button';
import FormGroup from '../../../components/UI/FormGroup/FormGroup';
import serialize from 'form-serialize';
import {fromJS} from 'immutable';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';
import {
    required,
    email,
    gt,
} from '../../../shared/validations';
import './LoginForm.scss';

class LoginForm extends Component {
    state = fromJS({
        formData: {
            email: {
                type: 'input',
                label: 'Email',
                options: {
                    name: 'email',
                    id: 'email',
                    type: 'email'
                },
                validations: [
                    required,
                    email
                ]
            },
            password: {
                type: 'input',
                label: 'Password',
                options: {
                    name: 'password',
                    id: 'password',
                    type: 'password',
                    min: 6
                },
                validations: [
                    required,
                    gt
                ]
            },
        }
    });

    componentDidMount() {
        this.props.onErrorClear();
    }

    loginFormSubmitHandler = (event) => {
        event.preventDefault();
        const registerData = serialize(event.target, {hash: true});
        this.props.onLogin(registerData);
    };

    render() {
        const formDatas = this.state.getIn(['formData']).toJSON();
        const formElements = [];
        for(let key in formDatas) {
            formElements.push({
                ...formDatas[key]
            });
        }
        if(this.props.error) {

        }
        const form = formElements.map(el => {
            return <FormGroup key={el.options.name} {...el}/>
        });
        let error = null;
        if(this.props.error) {
            error = <div className="Auth-error">{this.props.error}</div>
        }
        return (
            <div className="LoginForm card text-white bg-primary">
                <div className="card-header">
                    <h3>Login</h3>
                </div>
                <div className="card-body">
                    <Form onSubmit={this.loginFormSubmitHandler}>
                        {form}
                        <Button className="btn btn-light">Login</Button>
                    </Form>
                </div>
                {error}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.get('error')
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (registerData) => dispatch(actions.authLoginSaga(registerData)),
        onErrorClear: () => dispatch(actions.authErrorClear())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);