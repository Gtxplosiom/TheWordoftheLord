import { useState } from 'react';
import bookmark from '../../../../assets/icons/bookmark.svg';
import highlight from '../../../../assets/icons/highlight.svg';
import annotate from '../../../../assets/icons/annotate.svg'

const ToolSelector = () => {
    const [bookmarkerHovered, setBookmarkerHovered] = useState(false);
    const [clicked, OnClicked] = useState(false);
    const [highlighterHovered, setHighlighterHovered] = useState(false);
    const [annotatorHovered, setAnnotatorHovered] = useState(false);

    return (
        <div className="tool-selector-container">
            <div
                className={`bookmarker-container ${clicked ? 'clicked' : ''}`}
                onMouseEnter={() => setBookmarkerHovered(true)}
                onMouseLeave={() => setBookmarkerHovered(false)}
                onMouseDown={() => OnClicked(true)}
                onMouseUp={() => OnClicked(false)}
                >
                {bookmarkerHovered && (
                    <div className='tool-tip'>
                        <span>Bookmarker</span>
                    </div>
                )}
                <img src={bookmark} alt='Bookmarker' />
            </div>
            <div
                className={`highlighter-container ${clicked ? 'clicked' : ''}`}
                onMouseEnter={() => setHighlighterHovered(true)}
                onMouseLeave={() => setHighlighterHovered(false)}
                onMouseDown={() => OnClicked(true)}
                onMouseUp={() => OnClicked(false)}
                >
                {highlighterHovered && (
                    <div className='tool-tip'>
                        <span>Highlighter</span>
                    </div>
                )}
                <img src={highlight} alt='Highlighter' />
            </div>
            <div
                className={`annotator-container ${clicked ? 'clicked' : ''}`}
                onMouseEnter={() => setAnnotatorHovered(true)}
                onMouseLeave={() => setAnnotatorHovered(false)}
                onMouseDown={() => OnClicked(true)}
                onMouseUp={() => OnClicked(false)}
                >
                {annotatorHovered && (
                    <div className='tool-tip'>
                        <span>Annotator</span>
                    </div>
                )}
                <img src={annotate} alt='Annotator' />
            </div>
        </div>
    )
}

export default ToolSelector
