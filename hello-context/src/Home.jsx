import { useState, createContext, useContext, useMemo, useEffect } from "react";
import App from "./App";

export const HomeContext = useContext();

function app() {
    console.log("Calling App Function");
    return "App Function";
}
export default function Home() {
    const [data, setData] = useState("List Title");
    useEffect(() => {
        console.log("Rect effect");
    }, []) //do not work unless if it is first time or value changed
    //use when render with API

    return <HomeContext.Provider value={{ data, setData }}>
        <App />
        <Button onClick={() => {
            setData(data + 1);
        }}>Button</Button>
    </HomeContext.Provider>
}