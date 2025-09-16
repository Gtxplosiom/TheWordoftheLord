import { useState } from "react";
import Header from './components/app/Header'
import Content from './components/app/Content'
import Footer from "./components/app/Footer";
import { PageContext } from "./contexts/PageContext";
import './assets/scss/App.scss';

const App = () => {
    const [currTab, setCurrtab] = useState(1);

    return (
        <PageContext.Provider value={{currTab, setCurrtab}}>
            <div className="app-container">
                <Header />
                <Content />
                <Footer />
            </div>
        </PageContext.Provider>
    )
}

export default App
