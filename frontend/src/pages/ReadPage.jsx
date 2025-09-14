import { useState, useEffect, useContext } from 'react'
import { BookContext } from '../contexts/BookContext';
import { QueryContext } from '../contexts/QueryContext';
import { SearchContext } from '../contexts/SearchContext';
import { ShowVerseContext } from '../contexts/ShowVerseContext';
import axios from "axios";
import SearchBar from '../components/read-page/SearchBar';
import BookSelector from '../components/read-page/BookSelector'
import Reader from '../components/read-page/Reader'
import ToolSelector from '../components/read-page/ToolSelector'
import ResultAll from '../components/misc/ResultAll';
import '../assets/ReadPage.css'

const ReadPage = () => {
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
                    <div id='row1'>
                        <SearchBar />
                    </div>
                    <div id='row2' className={searchMode === "whole" && queryString !== "" ? "one-col" : "three-col"}>
                        <ShowVerseContext.Provider value={{currVerse, setCurrVerse}}>
                            {searchMode === "whole" && queryString !== "" ? (
                            <ResultAll bookList={books} currQuery={queryString}/>
                        ) : (
                            <>
                                <BookSelector bookList={books}/>
                                <Reader bookName={books[currBook]} currQuery={queryString}/>
                                <ToolSelector />
                            </>
                        )
                        }
                        </ShowVerseContext.Provider>
                    </div>
                </div>
            </QueryContext.Provider>
        </SearchContext.Provider>
    )
}

export default ReadPage
