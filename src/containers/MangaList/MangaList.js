import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import MangaListSearchForm from '../Form/MangaListSearchForm/MangaListSearchForm';
import MangaListSearch from '../../components/MangaListSearch/MangaListSearch';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import UpdateListItemForm from '../Form/UpdateListItemForm/UpdateListItemForm';
import HeaderTitle from '../../components/UI/HeaderTitle/HeaderTitle';

class MangaList extends Component {

    componentDidMount() {
        this.props.onSearch('', 10, this.props.token, 'all', 1);
    }

    componentWillUnmount() {
        this.props.onClear();
    }

    onUpdateView = (item) => {
        const data = {
            header: "Title",
            body: <UpdateListItemForm item={item}/>,
            additionalStyle: {
                width: "1200px",
                display: "block",
                margin: "50px auto",
            }
        };
        this.props.onModalOpen(data, null);
    };

    nextPageHandler = () => {
        this.props.onSearch(this.props.query, 10, this.props.token, this.props.searchType, this.props.pageInfo.currentPage + 1);
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
        if(this.props.items.length === 0 && this.props.search !== '') {
            header = (
                <Aux>
                    <legend className="result-title">No results for "{this.props.search}"</legend>
                </Aux>
            )
        }

        return (
            <Aux>
                <HeaderTitle text="Your List"/>
                <MangaListSearchForm
                    token={this.props.token}
                    onSearch={this.props.onSearch}/>
                {header}
                <MangaListSearch
                    items={this.props.items}
                    onUpdateView={this.onUpdateView}
                    />
                {next}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.get('token'),
        items: state.manga.get('items').toArray().map(item => item.toJSON()),
        pageInfo: state.manga.get('pageInfo').toJSON(),
        search: state.manga.get('search'),
        searchType: state.manga.get('searchType'),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSearch: (query, page, token, searchType, currentPage) => dispatch(actions.mangaSearchSaga(query, page, token, searchType, currentPage)),
        onModalOpen: (data, style) => dispatch(actions.modalOpen(data, style)),
        onClear: () => dispatch(actions.mangaClear())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MangaList);