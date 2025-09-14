import { useContext } from "react";
import { ShowVerseContext } from "../../contexts/ShowVerseContext";
import { QueryContext } from "../../contexts/QueryContext";

const ResultViewer = ({result}) => {
    const {setCurrVerse} = useContext(ShowVerseContext);
    const {setQueryString} = useContext(QueryContext);

    const ShowVerse = (chapterNum, verseNum) => {
        const verseKey = `${chapterNum}:${verseNum}`;
        setCurrVerse(verseKey);
        setQueryString("");
    };

    return (
        <div className="query-result-container">
            <div className="result-title-container">
                <h3>{result.length > 0 ? `Showing ${result.length} ${result.length > 1 ? 'results' : 'result'}` : 'Not found' }</h3>
            </div>
            {result.map((results, idx) => (
                <div className="result-container" key={idx} onClick={() => ShowVerse(results.chapterNum, results.verseNum)}>
                    <p><span style={{fontWeight: 'bold'}}>{results.chapterNum}:{results.verseNum}</span> - {results.verseText}</p>
                </div>
            ))}
        </div>
    )
}

export default ResultViewer