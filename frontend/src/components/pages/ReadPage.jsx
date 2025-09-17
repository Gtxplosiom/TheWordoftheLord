import { useState, useEffect, useContext } from 'react'
import { BookContext } from '../../contexts/BookContext';
import { QueryContext } from '../../contexts/QueryContext';
import { SearchContext } from '../../contexts/SearchContext';
import { ShowVerseContext } from '../../contexts/ShowVerseContext';
import axios from "axios";
import SearchBar from './read-page/SearchBar';
import BibleReader from './read-page/BibleReader';
import ResultAll from '../misc/ResultAll';
import '../../assets/scss/ReadPage.scss'

export default function ReadPage() {
    // stores book list
    const [books, setBooks] = useState([]);

    // stores the unique key of the current verse (chapter num:verse num) (context value)
    const [currVerse, setCurrVerse] = useState(null);

    // stores the query string from the search text box (context value)
    const [queryString, setQueryString] = useState("");

    // stores the current search mode if single book (single) or whole book (whole) (context value)
    const [searchMode, setSearchMode] = useState("single");

    const {currBook} = useContext(BookContext);

    useEffect(() => {
        axios.get("https://localhost:7048/api/BibleDb/booklist")
        .then(res => setBooks(res.data))
        .catch(err => console.error(err));
    }, []);

    return (
        <SearchContext.Provider value={{searchMode, setSearchMode}}>
            <QueryContext.Provider value={{queryString, setQueryString}}>
                {console.log(queryString)}
                <div className='read-page-container'>
                    <div className='search-bar'>
                        <SearchBar />
                    </div>
                    <div className='content-area'>
                        <ShowVerseContext.Provider value={{currVerse, setCurrVerse}}>
                            <div className={`result-all ${searchMode === 'whole' && queryString !== "" ? "visible" : "hidden"}`}>
                                <ResultAll bookList={books} currQuery={queryString}/>
                            </div>
                            <div className={`bible-reader ${searchMode === 'single' || queryString === "" ? "visible" : "hidden"}`}>
                                <BibleReader list={books} name={books[currBook]} query={queryString}/>
                            </div>
                        </ShowVerseContext.Provider>
                    </div>
                </div>
            </QueryContext.Provider>
        </SearchContext.Provider>
    )
}
