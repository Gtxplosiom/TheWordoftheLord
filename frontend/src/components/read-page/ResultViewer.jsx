const ResultViewer = ({result}) => {
    return (
        <div className="query-result-container">
            <div className="result-title-container">
                <h3>Showing {result.length} results</h3>
            </div>
            {result.map((results, idx) => (
                <div className="result-container" key={idx}>
                    <p>Chapter {results.chapter} - Verse {results.verse} - {results.text}</p>
                </div>
            ))}
        </div>
    )
}

export default ResultViewer