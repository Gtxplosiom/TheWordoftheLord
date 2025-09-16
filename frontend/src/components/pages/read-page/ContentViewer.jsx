import { useContext, useEffect, useRef } from "react";
import { ShowVerseContext } from "../../../contexts/ShowVerseContext";
import { ScrollPositionContext } from "../../../contexts/ScrollPositionContext";

const ContentViewer = ({book, contents, query}) => {
    // store refs for each verse in the current book
    const verseRefs = useRef({});
    const contentViewerRef = useRef(null);

    const {currVerse, setCurrVerse} = useContext(ShowVerseContext);
    const {scrollPos, setScrollPos} = useContext(ScrollPositionContext);

    // scroll position restoration
    // whenever content changes and currQuery changes
    useEffect(() => {
        if (contentViewerRef.current && scrollPos !== null) {
            contentViewerRef.current.scrollTop = Number(scrollPos);
            console.log("restoring scroll position:", scrollPos);
        }
    }, [contents, query]);

    const StoreScrollPos = (pos) => {
        // only store when not searching to not store scrollTop values from the resultview shen rendered
        if (query !== "") return;

        setScrollPos(pos);
        console.log(scrollPos);
    };

    // TODO: prevent scrolling animation lag
    // TODO: fix some target elements not in the expected position on scroll end (just below chapter title)
    // run whenever there is a new currVerse (chapterNum:verseNum) value
    useEffect(() => {
        if (currVerse !== null && verseRefs.current[currVerse]) {
            const element = verseRefs.current[currVerse];
            const container = element.closest(".content-viewer-container");

            if (!container) return;

            const offset = -85;
            const elementRect = element.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            const targetTop = elementRect.top - containerRect.top + container.scrollTop + offset;
            const startTop = container.scrollTop;
            const distance = targetTop - startTop;
            const scrollDuration = 1200;
            const flashDuration = 5000;
            let scrollStartTime = null;
            let flashStartTime = null;

            const easeInOutQuad = (t) =>
                t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

            const animateScroll = (timestamp) => {
                if (!scrollStartTime) scrollStartTime = timestamp;
                const elapsed = timestamp - scrollStartTime;
                const progress = Math.min(elapsed / scrollDuration, 1);

                const easedProgress = easeInOutQuad(progress);

                container.scrollTop = startTop + distance * easedProgress;

                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            };

            const animateBorderFlash = (timestamp) => {
                if (!flashStartTime) flashStartTime = timestamp;
                const elapsed = timestamp - flashStartTime;
                const progress = Math.min(elapsed / flashDuration, 1);

                const easedProgress = easeInOutQuad(progress);

                const opacity = 1 - Math.abs(0.5 - easedProgress) * 2; 
                element.style.border = `3px solid rgba(0, 0, 0, ${opacity})`;

                if (progress < 1) {
                    requestAnimationFrame(animateBorderFlash);
                } else {
                    element.style.border = "";
                }
            }

            requestAnimationFrame(animateScroll);
            requestAnimationFrame(animateBorderFlash);

            // reset cuurVerse value to prevent the animation playing on every page load
            setCurrVerse(null);
        }
    }, [currVerse]);

    return (
        <div 
            className="content-viewer-container"
            ref={contentViewerRef}
            onScroll={(e) => StoreScrollPos(e.currentTarget.scrollTop)}>
            <div className="book-title-container">
                <h2 className="book-title">Book of {book}</h2>
            </div>
            <div 
                className="book-text-container">
                {contents.chapters?.map((chapter, idx) => (
                    <div key={idx}>
                        <div className="chapter-container">
                            <h3 className="book-chapter">Chapter {chapter.chapterNumber}</h3>
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
