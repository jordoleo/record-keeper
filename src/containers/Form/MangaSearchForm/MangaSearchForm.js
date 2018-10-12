import React, {Component} from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import Select from 'react-validation/build/select';
import serialize from 'form-serialize';
import FontAwesome from 'react-fontawesome';
import './MangaSearchForm.scss';

class MangaSearchForm extends Component {

    onSearchFormSubmitHandler = (event) => {
        event.preventDefault();
        const searchData = serialize(event.target, {hash: true});
        this.props.onSearchManga(searchData.search, 10, searchData.type);
    };

    render() {
        return (
            <div className="MangaSearchFormContainer">
                <Form onSubmit={this.onSearchFormSubmitHandler} className="MangaSearchForm">
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

export default MangaSearchForm;
