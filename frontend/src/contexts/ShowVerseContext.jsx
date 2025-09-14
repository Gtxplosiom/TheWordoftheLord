import { createContext } from "react";

export const ShowVerseContext = createContext({
    currVerse: 0,
    setCurrVerse: () => {}
});
