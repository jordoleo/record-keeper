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
    equalsTo
} from '../../../shared/validations';
import './RegisterForm.scss';

class RegisterForm extends Component {
    state = fromJS({
        formData: {
            name: {
                type: 'input',
                label: 'Name',
                options: {
                    name: 'name',
                    id: 'name',
                    type: 'text',
                    min: 6
                },
                validations: [
                    required
                ]
            },
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
            confirmationPassword: {
                type: 'input',
                label: 'Confirmation Password',
                options: {
                    name: 'c_password',
                    id: 'c_password',
                    type: 'password',
                    same: 'password'
                },
                validations: [
                    required,
                    equalsTo
                ]
            }
        }
    });

    componentDidMount() {
        this.props.onErrorClear();
    }

    registerFormSubmitHandler = (event) => {
        event.preventDefault();
        const registerData = serialize(event.target, {hash: true});
        this.props.onRegister(registerData);
    };

    render() {
        const formDatas = this.state.getIn(['formData']).toJSON();
        const formElements = [];
        for(let key in formDatas) {
            formElements.push({
                ...formDatas[key]
            });
        }
        const form = formElements.map(el => {
            return <FormGroup key={el.options.name} {...el}/>
        });
        let error = null;
        if(this.props.error) {
            error = <div className="Auth-error">{this.props.error}</div>
        }
        return (
            <div className="RegisterForm card text-white bg-primary">
                <div className="card-header">
                    <h3>Register</h3>
                </div>
                <div className="card-body">
                    <Form onSubmit={this.registerFormSubmitHandler}>
                        {form}
                        <Button className="btn btn-light">Register</Button>
                    </Form>
                    {error}
                </div>
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
        onRegister: (registerData) => dispatch(actions.authRegisterSaga(registerData)),
        onErrorClear: () => dispatch(actions.authErrorClear())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);