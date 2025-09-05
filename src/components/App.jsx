import { useState } from "react";
import Header from "./Header";
import Content from "./Content";
import { PageContext } from "../contexts/PageContext";

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
