import { useState, useEffect } from "react";
import axios from "axios";
import { ResultLoading } from "../read-page/Loading";

const ResultAll = ({currQuery}) => {
    const [queryResult, setQueryResult] = useState([]);
    const [resultLoading, setResultLoading] = useState(false);

    useEffect(() => {
        const fetchQuery = async () => {
            if (currQuery === "") {
                setQueryResult([]);
                return;
            }

            setResultLoading(true);

            try {
                const res = await axios.get(`https://localhost:7048/api/Bible/query/${currQuery}`);
                setQueryResult(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setResultLoading(false);
            }
        };

        fetchQuery();
    }, [currQuery]);

    return (
        <>
        {
            resultLoading ? (
                <ResultLoading />
            ) : (
                <div className="query-result-container">
                    <div className="result-title-container">
                        <h3>Showing {queryResult.length} results</h3>
                    </div>
                    {queryResult.map((results, idx) => (
                        <div className="result-container" key={idx}>
                            <p>{results.book} {results.chapter}:{results.verse} - {results.text}</p>
                        </div>
                    ))}
                </div>
            )
        }
        </>
    )
}

export default ResultAll

// TODO: optimize search performace by properly handling api calls so that it won't freeze the browser page