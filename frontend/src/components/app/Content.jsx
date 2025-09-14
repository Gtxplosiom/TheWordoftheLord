import { useContext, useState } from 'react';
import { PageContext } from '../../contexts/PageContext';
import ReadPage from '../../pages/ReadPage';
import HomePage from '../../pages/HomePage';
import AboutPage from '../../pages/AboutPage';
import { BookContext } from '../../contexts/BookContext';
import { ScrollPositionContext } from '../../contexts/ScrollPositionContext';

const Content = () => {
    const {currTab} = useContext(PageContext);
    const [currBook, setCurrBook] = useState(0);
    const [scrollPos, setScrollPos] = useState(0);

    return (
        <div className='content-container'>
            <BookContext.Provider value={{currBook, setCurrBook}}>
                <ScrollPositionContext.Provider value={{scrollPos, setScrollPos}}>
                    {currTab === 0 && <ReadPage />}
                    {currTab === 1 && <HomePage />}
                    {currTab === 2 && <AboutPage />}
                </ScrollPositionContext.Provider>
            </BookContext.Provider>
        </div>
    )
}

export default Content;
