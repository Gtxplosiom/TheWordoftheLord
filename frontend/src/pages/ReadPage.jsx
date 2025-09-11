import { useState, useEffect } from 'react'
import { BookContext } from '../contexts/BookContext';
import { QueryContext } from '../contexts/QueryContext';
import { SearchContext } from '../contexts/SearchContext';
import axios from "axios";
import SearchBar from '../components/read-page/SearchBar';
import BookSelector from '../components/read-page/BookSelector'
import Reader from '../components/read-page/Reader'
import ToolSelector from '../components/read-page/ToolSelector'
import ResultAll from '../components/misc/ResultAll';
import '../assets/ReadPage.css'

const ReadPage = () => {
    const [books, setBooks] = useState([]);
    const [currBook, setCurrBook] = useState(0);
    const [queryString, setQueryString] = useState("");
    const [searchMode, setSearchMode] = useState("this")

    useEffect(() => {
        axios.get("https://localhost:7048/api/Bible/booklist")
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
                    <div id='row2' className={searchMode === "all" && queryString !== "" ? "one-col" : "three-col"}>
                        {searchMode === "all" && queryString !== "" ? (
                            <ResultAll currQuery={queryString}/>
                        ) : (
                            <BookContext.Provider value={{currBook, setCurrBook}}>
                                <BookSelector bookList={books}/>
                                <Reader bookName={books[currBook]} currQuery={queryString}/>
                                <ToolSelector />
                            </BookContext.Provider>
                        )
                        }
                    </div>
                </div>
            </QueryContext.Provider>
        </SearchContext.Provider>
    )
}

export default ReadPage
