import React, {Component} from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import serialize from 'form-serialize';
import * as actions from '../../../store/actions/index';
import {connect} from 'react-redux';

class UpdateListItemForm extends Component {

	onSubmitForm = (event) => {
		event.preventDefault();
		const data = serialize(event.target, {hash: true});
		this.props.onUpdateData({
            ...data,
            id: this.props.item.id,
            token: this.props.token
        });
	};

	render() {
		return (
			<div className="UpdateListItemFormContainer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="image-container">
                                <img src={this.props.item.anilist.image} alt="" style={{width: '100%'}}/>
                            </div>
                        </div>
                        <div className="col-md-10">
                            <legend>Update {this.props.item.anilist.title}</legend>
                            <Form className="UpdateListItemForm" onSubmit={this.onSubmitForm}>
                                <div className="form-group">
                                    <label htmlFor="chapter">Current chapter/ episode</label>
                                    <Input id="chapter" autoComplete="off" name="chapter" className="form-control" type="text" value={this.props.item.chapter}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="note">Note: </label>
                                    <textarea id="note" autoComplete="off" name="note" className="form-control" defaultValue={this.props.item.note}></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="url">url: </label>
                                    <Input id="url" autoComplete="off" name="url" className="form-control" type="text" value={this.props.item.url}/>
                                </div>
                                <div className="form-group">
                                    <Button className="btn btn-default">Update</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
			</div>
        )
	}
}

const mapStateToProps = state => {
    return {
        token: state.auth.get('token')
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdateData: (data) => dispatch(actions.mangaUpdateSaga(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateListItemForm);