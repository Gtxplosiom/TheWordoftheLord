import { useContext, useEffect, useRef, useLayoutEffect } from "react";
import { ShowVerseContext } from "../../contexts/ShowVerseContext";

const ContentViewer = ({book, contents, pos}) => {
    // store refs for each verse in the current book
    const verseRefs = useRef({});

    const {currVerse} = useContext(ShowVerseContext);

    // run whenever there is a new currVerse (chapterNum:verseNum) value
    useEffect(() => {
        if (currVerse !== null && verseRefs.current[currVerse]) {
            verseRefs.current[currVerse].scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [currVerse]);

    return (
        <div className="bible-container" >
            <div className="title-container">
                <h2>Book of {book}</h2>
            </div>

            <div 
                className="text-container">
                {contents.chapters?.map((chapter, idx) => (
                    <div key={idx}>
                        <div className="chapter-container">
                            <h3>Chapter {chapter.chapterNumber}</h3>
                        </div>
                        <div>
                            {chapter.verses.map((verse, vIdx) => {
                                const verseKey = `${chapter.chapterNumber}:${verse.verseNumber}`;
                                return (
                                    <p
                                        className="verse-container"
                                        key={vIdx}
                                        ref={(el) => (verseRefs.current[verseKey] = el)}
                                    >
                                    <span style={{ fontWeight: "bold" }}>
                                        {verse.verseNumber}
                                    </span>
                                        {verse.verseTexts.map((v, vtIdx) => (
                                    <span key={vtIdx}> {v.text}</span>
                                    ))}
                                </p>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ContentViewer
