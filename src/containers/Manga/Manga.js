import React, {Component} from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary';
import MangaSearchForm from '../Form/MangaSearchForm/MangaSearchForm';
import MangaSearch from '../../components/MangaSearch/MangaSearch';
import {lowerCase} from 'change-case';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import './Manga.scss';
import HeaderTitle from '../../components/UI/HeaderTitle/HeaderTitle';

class Manga extends Component {

    componentWillUnmount() {
        this.props.onSearchClear();
    }

    nextPageHandler = () => {
        this.props.onNextPage(
            this.props.pageInfo.currentPage,
            this.props.search,
            10,
            this.props.searchType
        )
    };

    insertHandler = (manga) => {
        let title = manga.title.romaji;
        if(manga.title.english !== null) {
            title = `${manga.title.romaji} (${manga.title.english})`
        }
        let type = lowerCase(manga.type);
        let format = null;
        if (manga.format === 'NOVEL') {
            type = 'novel';
        } else if(manga.type !== 'manga') {
            format = lowerCase(manga.format);
        }
        const mangaData = {
            anilist_id: manga.id,
            description: manga.description,
            genres: manga.genres.join(','),
            title: title,
            image: manga.coverImage.medium,
            type,
            format
        };
        this.props.onInsert(mangaData, this.props.token);
    };

    render() {
        let next = null;
        if(this.props.pageInfo.hasNextPage) {
            next = (
                <div onClick={this.nextPageHandler} style={{textAlign: 'center'}}>
                    <div className="load-more">
                        Load More
                    </div>
                </div>
            );
        }

        let header = null;
        if(this.props.mangas.length === 0 && this.props.search !== '') {
            header = (
                    <Aux>
                        <legend className="result-title">No results for "{this.props.search}"</legend>
                    </Aux>
                )
        } else if (this.props.mangas.length === 0) {
            header = (
                <Aux>
                    <legend className="result-title">The search result will be shown here</legend>
                </Aux>
            )
        }

        return (
            <Aux>
                <HeaderTitle text="Search from Anilist"/>
                <MangaSearchForm
                    onSearchManga={this.props.onSearchManga}/>
                {header}
                <MangaSearch mangas={this.props.mangas} onInsert={this.insertHandler}/>
                {next}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        mangas: state.anilist.get('items').toArray().map(manga => manga.toJSON()),
        search: state.anilist.get('search'),
        pageInfo: state.anilist.get('pageInfo').toJSON(),
        token: state.auth.get('token'),
        searchType: state.anilist.get('searchType')
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSearchManga: (search, perPage, type) => dispatch(actions.anilistSearchSaga(search, perPage, type)),
        onNextPage: (currentPage, search, perPage, searchType) => dispatch(actions.anilistSearchNextPageSaga(currentPage, search, perPage, searchType)),
        onInsert: (manga, token) => dispatch(actions.mangaInsertSaga(manga, token)),
        onSearchClear: () => dispatch(actions.anilistClearSearch()),
        onModalOpen: (data, style) => dispatch(actions.modalOpen(data, style)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Manga);