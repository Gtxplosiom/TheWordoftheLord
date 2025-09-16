import { useState, useEffect, lazy, Suspense, useContext, useRef } from "react";
import axios from "axios";
import { ContentLoading, ResultLoading } from "../Loading";
import { ScrollPositionContext } from "../../../../contexts/ScrollPositionContext";

const ContentViewer = lazy(() => import('../ContentViewer'));
const ResultViewer = lazy(() => import('../ResultViewer'));

const Reader = ({bookName, currQuery}) => {
    const [content, setContent] = useState([]);
    const [queryResult, setQueryResult] = useState([]);
    const [contentLoading, setContentLoading] = useState(false);
    const [resultLoading, setResultLoading] = useState(false);

    console.log(bookName);

    useEffect(() => {
        const fetchBook = async () => {

            setContentLoading(true);

            try {
                const res = await axios.get(`https://localhost:7048/api/BibleDb/content/${bookName}`);
                setContent(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setContentLoading(false);
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

            setResultLoading(true);

            try {
                const res = await axios.get(`https://localhost:7048/api/BibleDb/query/single/${bookName}/${currQuery}`);
                setQueryResult(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setResultLoading(false);
            }
        };

        fetchQuery();
    }, [currQuery, bookName]);
    
    return (
        <div className="reader-container">
            {currQuery !== "" ? (
                resultLoading ? (
                    <ResultLoading />
                ) : (
                    <Suspense fallback={<ResultLoading />}>
                        <ResultViewer result={queryResult}/>
                    </Suspense>
                )
            ) : (
                contentLoading ? (
                    <ContentLoading />
                ) : (
                    <Suspense fallback={<ContentLoading />}>
                        <ContentViewer book={bookName} contents={content} query={currQuery}/>
                    </Suspense>
                )
            )
            }
        </div>
    )
}

export default Reader
