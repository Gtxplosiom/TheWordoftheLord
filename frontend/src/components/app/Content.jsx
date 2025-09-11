import { useContext } from 'react';
import { PageContext } from '../../contexts/PageContext';
import ReadPage from '../../pages/ReadPage';
import HomePage from '../../pages/HomePage';
import AboutPage from '../../pages/AboutPage';
import '../../assets/Content.css'

const Content = () => {
    const {currTab} = useContext(PageContext);

    return (
        <div className='content-container'>
            {currTab === 0 && <ReadPage />}
            {currTab === 1 && <HomePage />}
            {currTab === 2 && <AboutPage />}
        </div>
    )
}

export default Content;
