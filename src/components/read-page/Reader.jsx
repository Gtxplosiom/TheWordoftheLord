import { useState, useEffect } from "react";
import axios from "axios";

const Reader = ({bookName, currQuery}) => {
    const [content, setContent] = useState([]);
    const [queryResult, setQueryResult] = useState([]);
    const [loading, setLoading] = useState(true);

    console.log(bookName);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`https://localhost:7048/api/Bible/${bookName}`);
                setContent(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        if (bookName) fetchBook();
    }, [bookName]);

    useEffect(() => {
        const fetchQuery = async () => {
            if (currQuery === "") {
                setQueryResult([]);
                return;
            }

            try {
                const res = await axios.get(`https://localhost:7048/api/Bible/query/${currQuery}`);
                setQueryResult(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        };

        fetchQuery();
    }, [currQuery]);

    
    return (
        <div className="reader-container">
            {currQuery !== "" ? (
                loading === true ? (
                    <p>Fetching results please wait...</p>
                ) : (
                    <div className="query-result-container">
                        {queryResult.map(results => (
                            <div>
                                <p>{results.book} - {results.chapter} - {results.verse} - {results.text}</p>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <div className="bible-container">
                    <div className="title-container">
                        <h2>Book of {content.name}</h2>
                    </div>

                    <div className="text-container">
                        {content.chapters?.map(chapter => (
                            <div>
                                <h3>Chapter {chapter.chapter}</h3>
                                <div key={chapter.chapter}>
                                    {chapter.verses.map(v => (
                                        <p><span style={{fontWeight: 'bold'}}>{v.verse}</span>  {v.text}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Reader

// TODO: parallelize the fetching of data to make the ui still responsive even when fetching
