import { useContext } from "react";
import { QueryContext } from "../../contexts/QueryContext";

const SearchBar = () => {
    const {setQueryString} = useContext(QueryContext);

    const SearchQuery = (e) => {
        setQueryString(e.target.value);
    }

    return (
        <div className="search-bar-container">
            <input placeholder="Search here..." onChange={SearchQuery}></input>
        </div>
    )
}

export default SearchBar