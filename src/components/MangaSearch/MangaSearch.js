import React from 'react';
import SearchItem from '../../containers/Manga/SearchItem/SearchItem';

const mangaSearch = (props) => {
    let mangas = null;
    if(props.mangas) {
        mangas = props.mangas.map(manga => {
            return (
                <SearchItem
                    onInsert={props.onInsert}
                    key={manga.id}
                    manga={manga}/>
            );
        });
    }
    return (
        <div>
            {mangas}
        </div>
    );
};

export default mangaSearch;