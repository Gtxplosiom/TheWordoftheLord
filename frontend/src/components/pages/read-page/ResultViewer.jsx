import { useContext } from "react";
import { ShowVerseContext } from "../../../contexts/ShowVerseContext";
import { QueryContext } from "../../../contexts/QueryContext";

const ResultViewer = ({result}) => {
    const {setCurrVerse} = useContext(ShowVerseContext);
    const {queryString, setQueryString} = useContext(QueryContext);

    const ShowVerse = (chapterNum, verseNum) => {
        const verseKey = `${chapterNum}:${verseNum}`;
        setCurrVerse(verseKey);
        setQueryString("");
    };

    const highlightText = (text, query) => {
        if (!query) return text;

        const regex = new RegExp(`(${query})`, "gi"); // case-insensitive
        const parts = text.split(regex);

        return parts.map((part, idx) =>
            regex.test(part) ? 
                <span 
                    key={idx}
                    style={{fontWeight: 'bold', fontStyle: 'italic'}}
                    >
                    {part}
                </span> : part
        );
    };

    return (
        <div className="result-viewer-container">
            <div className="result-title-container">
                <h3 className="result-title">{result.length > 0 ? `Showing ${result.length} ${result.length > 1 ? 'results' : 'result'}` : 'Not found' }</h3>
            </div>
            {result.map((results, idx) => (
                <div className="result-container" key={idx} onClick={() => ShowVerse(results.chapterNum, results.verseNum)}>
                    <p><span style={{fontWeight: 'bold'}}>{results.chapterNum}:{results.verseNum}</span> - 
                        <span> {highlightText(results.verseText, queryString)}</span>
                    </p>
                </div>
            ))}
        </div>
    )
}

export default ResultViewer