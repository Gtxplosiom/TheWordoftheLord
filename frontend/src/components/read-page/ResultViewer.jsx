const ResultViewer = ({result}) => {
    return (
        <div className="query-result-container">
            <div className="result-title-container">
                <h3>{result.length > 0 ? `Showing ${result.length} ${result.length > 1 ? 'results' : 'result'}` : 'Not found' }</h3>
            </div>
            {result.map((results, idx) => (
                <div className="result-container" key={idx}>
                    <p><span style={{fontWeight: 'bold'}}>{results.chapterNum}:{results.verseNum}</span> - {results.verseText}</p>
                </div>
            ))}
        </div>
    )
}

export default ResultViewer