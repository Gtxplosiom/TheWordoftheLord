import { useState, useEffect } from 'react'
import { BookContext } from '../contexts/BookContext';
import axios from "axios";
import BookSelector from '../components/read-page/BookSelector'
import Reader from '../components/read-page/Reader'
import ToolSelector from '../components/read-page/ToolSelector'
import '../assets/ReadPage.css'

const ReadPage = () => {
    const [books, setBooks] = useState([]);
    const [currBook, setCurrBook] = useState(0);

    useEffect(() => {
        axios.get("https://localhost:7048/api/Bible/booklist")
        .then(res => setBooks(res.data))
        .catch(err => console.error(err));
    }, []);

    return (
        <div className='read-page-container'>
            <BookContext.Provider value={{currBook, setCurrBook}}>
                <BookSelector bookList={books}/>
                <Reader bookName={books[currBook]}/>
                <ToolSelector />
            </BookContext.Provider>
        </div>
    )
}

export default ReadPage
