import { useContext } from 'react';
import { PageContext } from '../../contexts/PageContext';
import ReadPage from '../../pages/ReadPage';
import HomePage from '../../pages/HomePage';
import AboutPage from '../../pages/AboutPage';

const Content = () => {
    const {currTab} = useContext(PageContext);

    return (
        <div>
            {currTab === 0 && <ReadPage />}
            {currTab === 1 && <HomePage />}
            {currTab === 2 && <AboutPage />}
        </div>
    )
}

export default Content;
