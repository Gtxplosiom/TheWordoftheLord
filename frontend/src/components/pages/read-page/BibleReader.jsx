import BookSelector from "./bible-reader/BookSelector";
import Reader from "./bible-reader/Reader";
import ToolSelector from "./bible-reader/ToolSelector";

const BibleReader = ({list, name, query}) => {
    return (
        <>
            <BookSelector bookList={list}/>
            <Reader bookName={name} currQuery={query}/>
            <ToolSelector />
        </>
    )
}

export default BibleReader
