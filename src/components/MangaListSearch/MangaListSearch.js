import React from 'react';
import SearchListItem from '../../containers/MangaList/SearchListItem/SearchListItem';

const mangaListSearch = (props) => {
    let items = null;
    if(props.items) {
        items = props.items.map(item => {
            return (
                <SearchListItem
                    onInsert={props.onInsert}
                    onUpdateView={props.onUpdateView}
                    key={item.id}
                    item={item}/>
            );
        });
    }
    return (
        <div>
            {items}
        </div>
    );
};

export default mangaListSearch;