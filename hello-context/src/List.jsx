import { useState, createContext, useContext } from "react";
import Home, { HomeContext } from "./Home";

export default function List({ children }) {
    const {data, setData}  = useContext(HomeContext);
    
    return <div>
        <h1>{data}</h1>
        <ul>{children}</ul>
        <button onClick={() => {
            setData("new Title");
        }}>button</button>

    </div>;
}