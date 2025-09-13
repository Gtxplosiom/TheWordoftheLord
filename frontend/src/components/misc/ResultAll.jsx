import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { VariableSizeList as List } from "react-window";
import { ResultLoading } from "../read-page/Loading";

const ResultAll = ({currQuery}) => {
    const [queryResult, setQueryResult] = useState([]);
    const [resultLoading, setResultLoading] = useState(false);
    const containerRef = useRef(null)
    const [containerHeight, setContainerHeight] = useState(0);

    // TODO: make this more dynamic
    const getItemSize = (index) => {
        const verse = queryResult[index];
        const baseHeight = 40; // minimum row height
        const extraPerChar = 0.07; // tweak until it feels right
        return baseHeight + verse.verseText.length * extraPerChar;
    };

    useEffect(() => {
        const updateContainerHeight = () => {
            if (containerRef.current) {
                setContainerHeight(containerRef.current.getBoundingClientRect().height);
            }
        }

        updateContainerHeight();

        window.addEventListener('resize', updateContainerHeight);

        return () => {
          window.removeEventListener('resize', updateContainerHeight);
        };

    }, []);

    useEffect(() => {
        const fetchQuery = async () => {
            if (currQuery === "") {
                setQueryResult([]);
                return;
            }

            setResultLoading(true);

            try {
                const res = await axios.get(`https://localhost:7048/api/BibleDb/query/whole/${currQuery}`);
                setQueryResult(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setResultLoading(false);
            }
        };

        // debouncer (optional/reconsider)
        // const handler = setTimeout(fetchQuery, 300);
        // return () => clearTimeout(handler);

        fetchQuery();
    }, [currQuery]);

    const Verse = ({index, style}) => {
        const verse = queryResult[index];
        return (
            <div style={style} className="result-container">
                <p>
                    <span style={{fontWeight: 'bold'}}>
                        {verse.bookName} {verse.chapterNum}:{verse.verseNum}
                    </span> - {verse.verseText}
                </p>
            </div>
        )
    }

    return (
        <>
        {
            resultLoading ? (
                <ResultLoading />
            ) : (
                <div className="query-result-container" ref={containerRef}>
                    <div className="result-title-container">
                        <h3>Showing {queryResult.length} results</h3>
                    </div>
                    {
                        queryResult.length > 0 ? (
                            <List
                            itemCount={queryResult.length}
                            itemSize={getItemSize}
                            width="100%"
                            height={containerHeight}
                            >
                                {Verse}
                            </List>
                        ) : (
                            <p>No results found</p>
                        )
                    }
                </div>
            )
        }
        </>
    )
}

export default ResultAll
