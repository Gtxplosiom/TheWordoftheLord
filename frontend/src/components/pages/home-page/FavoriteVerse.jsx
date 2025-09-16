import { useState, useEffect } from "react";
import axios from "axios";
import { ContentLoading } from "../read-page/Loading";

const FavoriteVerse = () => {
    const [contentLoading, setContentLoading] = useState(false);
    const [verse, setVerse] = useState('');

    useEffect(() => {
        const fetchVerse = async () => {

            setContentLoading(true);

            // temp la ini
            const book = "Psalms";
            const chapter = 23;
            const verse = 1;

            try {
                const res = await axios.get(`https://localhost:7048/api/BibleDb/query/verse/${book}/${chapter}/${verse}`);
                setVerse(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setContentLoading(false);
            }
        }

        fetchVerse();
    }, []);

    return (
        contentLoading !== true ? (
            <div className="favorite-verse-container">
                <div className="favorite-verse-text">
                    <p className="text">
                        "{verse.verseText}"
                    </p>
                </div>
                <div className="favorite-verse-id">
                    <p className="id">- {verse.bookName} {verse.chapterNum}:{verse.verseNum}</p>
                </div>
            </div>
        ) : (
            <ContentLoading />
        )
    )
}

export default FavoriteVerse