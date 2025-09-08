import { useState, useEffect } from "react"
import axios from "axios";

const Reader = ({bookName}) => {
    const [content, setContent] = useState([]);

    console.log(bookName);

    useEffect(() => {
        axios.get(`https://localhost:7048/api/Bible/${bookName}`)
        .then(res => setContent(res.data))
        .catch(err => console.error(err));
    }, [bookName]);
    
    return (
        <div className="reader-container">
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
    )
}

export default Reader
