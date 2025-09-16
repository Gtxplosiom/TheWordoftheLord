import { useContext } from "react";
import { BookContext } from '../../../../contexts/BookContext';
import { ScrollPositionContext } from "../../../../contexts/ScrollPositionContext";

const BookSelector = ({bookList}) => {
    const {currBook, setCurrBook} = useContext(BookContext);
    const {setScrollPos} = useContext(ScrollPositionContext);

    const CycleBooks = (value) => {
        var newPage = value + currBook;

        if (newPage >= 0 && newPage < bookList.length) setCurrBook(newPage);

        setScrollPos(0);
    }

    const firstUpper = currBook - 3;
    const secondUpper = currBook - 2;
    const thirdUpper = currBook - 1;
    const focused = currBook;
    const firstLower = currBook + 1;
    const secondLower = currBook + 2;
    const thirdLower = currBook + 3;

    return (
        <div 
            className="book-selector-container"
            onWheel={(e) => {
                if (e.deltaY < 0)
                {
                    CycleBooks(-1);
                } else {
                    CycleBooks(1);
                }
            }}>
            <div className="book-container">
                <div id="first-upper" className="visible-book" onClick={() => CycleBooks(-3)}><span style={{opacity: 0.2}}>{firstUpper >= 0 ? bookList[firstUpper] : ''}</span></div>
                <div id="second-upper" className="visible-book" onClick={() => CycleBooks(-2)}><span style={{opacity: 0.5}}>{secondUpper >= 0 ? bookList[secondUpper] : ''}</span></div>
                <div id="third-upper" className="visible-book" onClick={() => CycleBooks(-1)}><span style={{opacity: 0.8}}>{thirdUpper >= 0 ? bookList[thirdUpper] : ''}</span></div>
                <div id="focused" className="visible-book">{bookList[focused]}</div>
                <div id="first-lower" className="visible-book" onClick={() => CycleBooks(1)}><span style={{opacity: 0.8}}>{firstLower < bookList.length ? bookList[firstLower] : ''}</span></div>
                <div id="second-lower" className="visible-book" onClick={() => CycleBooks(2)}><span style={{opacity: 0.5}}>{secondLower < bookList.length ? bookList[secondLower] : ''}</span></div>
                <div id="third-lower" className="visible-book" onClick={() => CycleBooks(3)}><span style={{opacity: 0.2}}>{thirdLower < bookList.length ? bookList[thirdLower] : ''}</span></div>
            </div>
        </div>
    )
}

export default BookSelector
