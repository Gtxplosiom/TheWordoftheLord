import { useContext, useState } from "react";
import { QueryContext } from "../../contexts/QueryContext";
import { SearchContext } from "../../contexts/SearchContext";

const SearchBar = () => {
    const {setQueryString} = useContext(QueryContext);
    const {setSearchMode} = useContext(SearchContext);
    const [button1State, setButton1State] = useState(true);
    const [button2State, setButton2State] = useState(false);

    const SearchQuery = (e) => {
        setQueryString(e.target.value);
    }

    const Activate = (button, e) => {
        if (button === "button1") {
            setButton1State(true);
            setButton2State(false);
            setSearchMode("single");
        } else if (button === "button2") {
            setButton2State(true);
            setButton1State(false);
            setSearchMode("whole");
        }
    }

    return (
        <div className="search-bar-container">
            <input 
                placeholder="Search here..."
                onChange={SearchQuery}
                onKeyDown={(e) => {
                    if (e.key === "Enter")
                    {
                        SearchQuery(e);
                    }
                }}
                />
            <button className={`search-button ${button1State ? "active" : ""}`} onClick={() => Activate("button1")}>Search this book</button>
            <button className={`search-button ${button2State ? "active" : ""}`} onClick={() => Activate("button2")}>Search whole bible</button>
        </div>
    )
}

export default SearchBar