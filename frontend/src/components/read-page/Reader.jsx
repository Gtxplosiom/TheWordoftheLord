import { useState, useEffect, lazy, Suspense, useContext, useRef } from "react";
import axios from "axios";
import { ContentLoading, ResultLoading } from "./Loading";
import { ScrollPositionContext } from "../../contexts/ScrollPositionContext";

const ContentViewer = lazy(() => import('./ContentViewer'));
const ResultViewer = lazy(() => import('./ResultViewer'));

const Reader = ({bookName, currQuery}) => {
    const [content, setContent] = useState([]);
    const [queryResult, setQueryResult] = useState([]);
    const [contentLoading, setContentLoading] = useState(false);
    const [resultLoading, setResultLoading] = useState(false);
    const {scrollPos, setScrollPos} = useContext(ScrollPositionContext);
    const readerContainerRef = useRef(null);

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

    // scroll position restoration
    // whenever content changes and currQuery changes
    useEffect(() => {
        if (readerContainerRef.current && scrollPos !== null) {
            readerContainerRef.current.scrollTop = Number(scrollPos);
            console.log("restoring scroll position:", scrollPos);
        }
    }, [content, currQuery]);

    const StoreScrollPos = (pos) => {
        // only store when not searching to not store scrollTop values from the resultview shen rendered
        if (currQuery !== "") return;

        setScrollPos(pos);
        console.log(scrollPos);
    };
    
    return (
        <div 
            className="reader-container"
            ref={readerContainerRef}
            onScroll={(e) => StoreScrollPos(e.currentTarget.scrollTop)}
            >
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
                        <ContentViewer book={bookName} contents={content}/>
                    </Suspense>
                )
            )
            }
        </div>
    )
}

export default Reader
