import React, {Component} from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import Select from 'react-validation/build/select';
import FontAwesome from 'react-fontawesome';
import './MangaListSearchForm.scss';
import serialize from 'form-serialize';

class MangaListSearchForm extends Component {
    onSearchFormSubmitHandler = (event) => {
        event.preventDefault();
        const searchData = serialize(event.target, {hash: true});
        this.props.onSearch(searchData.search, 10, this.props.token, searchData.type, 1);
    };

    render() {
        return (
            <div className="MangaListSearchFormContainer">
                <Form onSubmit={this.onSearchFormSubmitHandler} className="MangaListSearchForm">
                    <div className="form-group">
                        <label htmlFor="search">Search Keyword</label>
                        <div className="input-group mb-3">
                            <Input id="search" autoComplete="off" name="search" className="form-control" type="text"/>
                            <div className="input-group-append">
                                <Button className="btn input-group-text"><FontAwesome name="search"/></Button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <Select className="form-control" name="type">
                            <option value="all">All</option>
                            <option value="manga">Manga</option>
                            <option value="anime">Anime</option>
                            <option value="novel">Novel</option>
                        </Select>
                    </div>
                </Form>
            </div>
        );

    }
}

export default MangaListSearchForm;
