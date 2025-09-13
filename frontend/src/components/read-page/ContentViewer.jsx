const ContentViewer = ({contents}) => {
    return (
        <div className="bible-container">
            <div className="title-container">
                <h2>Book of {contents.name}</h2>
            </div>

            <div className="text-container">
                {contents.chapters?.map((chapter, idx) => (
                    <div key={idx}>
                        <h3>Chapter {chapter.chapterNumber}</h3>
                        <div>
                            {chapter.verses.map((verses, vIdx) => (
                                <p key={vIdx}><span style={{fontWeight: 'bold'}}>{verses.verseNumber}</span>
                                  {verses.verseTexts.map((v, vtIdx) => (
                                    <span key={vtIdx}> {v.text}</span>
                                  ))}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ContentViewer
