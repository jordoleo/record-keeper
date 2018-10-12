import React, {Component} from 'react';
import './SearchItem.scss';
import {upperCaseFirst, lowerCase} from 'change-case'
import dateFormat from 'dateformat';
import FontAwesome from 'react-fontawesome';

class SearchItem extends Component {
    state = {
        showDesc: false
    };

    toggleShowMoreHandler = () => {
        const newState = !this.state.showDesc;
        this.setState({
            showDesc: newState
        });
    };

    render() {
        let title = this.props.manga.title.romaji;
        if(this.props.manga.title.english !== null) {
            title = `${this.props.manga.title.romaji} (${this.props.manga.title.english})`
        }
        const genres = this.props.manga.genres.map(genre => {
            return (
                <div
                    key={genre}
                    className="genre">
                    {genre}
                </div>
            );
        });
        let type = upperCaseFirst(lowerCase(this.props.manga.type));
        if(type === 'Manga' && this.props.manga.format === 'NOVEL') {
            type = 'Novel';
        } else if(type !== 'Manga'){
            type = type + ` (${upperCaseFirst(lowerCase(this.props.manga.format))})`;
        }
        let statistic = null;
        if(this.state.showDesc) {
            statistic = (
                <table className="table table-bordered">
                    <tbody>
                    {this.props.manga.status? (
                        <tr>
                            <td>Status</td>
                            <td>{upperCaseFirst(lowerCase(this.props.manga.status.split('_').join(' ')))}</td>
                        </tr>
                    ): null}
                    {this.props.manga.startDate? (
                        <tr>
                            <td>Airing</td>
                            <td>
                                {dateFormat(new Date(this.props.manga.startDate.year, this.props.manga.startDate.month, this.props.manga.startDate.day), "longDate")}
                                <span> to </span>
                                {this.props.manga.endDate.year ? dateFormat(new Date(this.props.manga.endDate.year, this.props.manga.endDate.month, this.props.manga.endDate.day), "longDate") : "?"}
                            </td>
                        </tr>
                    ): null}
                    {this.props.manga.episodes? (
                        <tr>
                            <td>Episode</td>
                            <td>{this.props.manga.episodes}</td>
                        </tr>
                    ): null}
                    {this.props.manga.duration? (
                        <tr>
                            <td>Duration</td>
                            <td>{this.props.manga.duration} minutes</td>
                        </tr>
                    ): null}
                    {this.props.manga.chapters? (
                        <tr>
                            <td>Chapters</td>
                            <td>{this.props.manga.chapters}</td>
                        </tr>
                    ): null}
                    {this.props.manga.volumes? (
                        <tr>
                            <td>Volumes</td>
                            <td>{this.props.manga.volumes}</td>
                        </tr>
                    ): null}
                    </tbody>
                </table>
            );
        }

        let averageScore = null;
        if(this.props.manga.averageScore) {
            averageScore = (
                    <div className="type">Score: {this.props.manga.averageScore/10}</div>
                );
        }

        return (
            <div className="SearchItem">
                <div className="image-container">
                    <img src={this.props.manga.coverImage.medium} alt=""/>
                    <button className="btn btn-primary" onClick={() => this.props.onInsert(this.props.manga)}>Add to My List</button>
                    <div className="type">{type}</div>
                    {averageScore}
                </div>
                <div className="description-container">
                    <div className="title">{title}</div>
                    <hr/>
                    <div className="description" dangerouslySetInnerHTML={{__html: this.props.manga.description}}>
                    </div>
                    <div className="genre-container">
                        {genres}
                    </div>
                    <br/>
                    <p className="show-more" onClick={this.toggleShowMoreHandler}>
                        {this.state.showDesc? <span>Show less <FontAwesome name="caret-up"/></span> : <span>Show more <FontAwesome name="caret-down"/></span> }
                    </p>
                    {statistic}
                </div>
            </div>
        );
    };
}


export default SearchItem;