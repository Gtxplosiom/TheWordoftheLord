import { useState } from "react";
import Header from './components/app/Header'
import Content from './components/app/Content'
import { PageContext } from "./contexts/PageContext";
import './assets/Global.css'

const App = () => {
    const [currTab, setCurrtab] = useState(1);

    return (
        <PageContext.Provider value={{currTab, setCurrtab}}>
            <Header />
            <Content />
        </PageContext.Provider>
    )
}

export default App
