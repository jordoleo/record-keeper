import React, {Component} from 'react';
import {upperCaseFirst} from 'change-case'
import FontAwesome from 'react-fontawesome';
import hrt from 'human-readable-time';

class mangaListItem extends Component{
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
        let title = this.props.item.anilist.title;
        const genres = this.props.item.anilist.genres.split(',').map(genre => {
            return (
                <div
                    key={genre}
                    className="genre">
                    {genre}
                </div>
            );
        });
        let type = upperCaseFirst(this.props.item.anilist.type);
        if(type === 'Manga' && this.props.item.anilist.format === 'novel') {
            type = 'Novel';
        } else if(type === 'Anime'){
            type = type + ` (${upperCaseFirst(this.props.item.anilist.format)})`;
        }
        let statistic = null;
        if(this.state.showDesc) {
            statistic = (
                <table className="table table-bordered">
                    <tbody>
                        <tr>
                            <td>Current chapter/episode</td>
                            <td>{this.props.item.chapter}</td>
                        </tr>
                        <tr>
                            <td>Read url</td>
                            <td>{this.props.item.url}</td>
                        </tr>
                        <tr>
                            <td>Note</td>
                            <td>{this.props.item.note}</td>
                        </tr>
                    </tbody>
                </table>
            );
        }

        const createdDate = new Date(this.props.item.created_at);
        const updatedDate = new Date(this.props.item.updated_at);

        return (
            <div className="SearchItem">
                <div className="image-container">
                    <img src={this.props.item.anilist.image} alt=""/>
                    <button className="btn btn-primary" onClick={() => this.props.onUpdateView(this.props.item)}>Update</button>
                    <div className="type">{type}</div>
                    <br/>
                    <div className="type" style={{fontSize: '10px'}}>
                        created
                        <br/>
                        {hrt(createdDate, '%relative% ago')}
                        <br/><br/>
                        updated
                        <br/>
                        {hrt(updatedDate, '%relative% ago')}
                    </div>
                </div>
                <div className="description-container">
                    <div className="title">{title}</div>
                    <hr/>
                    <div className="description" dangerouslySetInnerHTML={{__html: this.props.item.anilist.description}}>
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

export default mangaListItem;