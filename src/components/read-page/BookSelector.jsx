import { useContext } from "react"
import { BookContext } from '../../contexts/BookContext';

const BookSelector = ({bookList}) => {
    const {currBook, setCurrBook} = useContext(BookContext);

    const CycleBooks = (value) => {
        var newPage = value + currBook;

        if (newPage >= 0 && newPage < bookList.length) setCurrBook(newPage);
    }

    const firstUpper = currBook - 2;
    const secondUpper = currBook - 1;
    const focused = currBook;
    const firstLower = currBook + 1;
    const secondLower = currBook + 2;

    return (
        <div className="book-selector-container">
            <div className="book-container">
                <div id="first-upper" className="visible-book" onClick={() => CycleBooks(-2)}>{firstUpper >= 0 ? bookList[firstUpper] : ''}</div>
                <div id="second-upper" className="visible-book" onClick={() => CycleBooks(-1)}>{secondUpper >= 0 ? bookList[secondUpper] : ''}</div>
                <div id="focused" className="visible-book">{bookList[focused]}</div>
                <div id="first-lower" className="visible-book" onClick={() => CycleBooks(1)}>{firstLower < bookList.length ? bookList[firstLower] : ''}</div>
                <div id="second-lower" className="visible-book" onClick={() => CycleBooks(2)}>{secondLower < bookList.length ? bookList[secondLower] : ''}</div>
            </div>
        </div>
    )
}

export default BookSelector
