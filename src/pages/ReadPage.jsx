import { useState, useEffect } from 'react'
import { BookContext } from '../contexts/BookContext';
import { QueryContext } from '../contexts/QueryContext';
import axios from "axios";
import SearchBar from '../components/read-page/SearchBar';
import BookSelector from '../components/read-page/BookSelector'
import Reader from '../components/read-page/Reader'
import ToolSelector from '../components/read-page/ToolSelector'
import '../assets/ReadPage.css'

const ReadPage = () => {
    const [books, setBooks] = useState([]);
    const [currBook, setCurrBook] = useState(0);
    const [queryString, setQueryString] = useState("");

    useEffect(() => {
        axios.get("https://localhost:7048/api/Bible/booklist")
        .then(res => setBooks(res.data))
        .catch(err => console.error(err));
    }, []);

    return (
        <QueryContext.Provider value={{queryString, setQueryString}}>
            {console.log(queryString)}
            <div className='read-page-container'>
                <div id='row1'>
                    <SearchBar />
                </div>
                <div id='row2'>
                    <BookContext.Provider value={{currBook, setCurrBook}}>
                        <BookSelector bookList={books}/>
                        <Reader bookName={books[currBook]} currQuery={queryString}/>
                        <ToolSelector />
                    </BookContext.Provider>
                </div>
            </div>
        </QueryContext.Provider>
    )
}

export default ReadPage
