const ContentViewer = ({contents}) => {
    return (
        <div className="bible-container">
            <div className="title-container">
                <h2>Book of {contents.name}</h2>
            </div>

            <div className="text-container">
                {contents.chapters?.map((chapter, idx) => (
                    <div key={idx}>
                        <h3>Chapter {chapter.chapter}</h3>
                        <div>
                            {chapter.verses.map((v, vIdx) => (
                                <p key={vIdx}><span style={{fontWeight: 'bold'}}>{v.verse}</span>  {v.text}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ContentViewer
