import { createRef, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
    const textFieldRef = createRef<HTMLInputElement>();

    const onClickButton = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();

        const textFieldText = textFieldRef.current?.value;
        if (textFieldText) {
            textFieldText?.replaceAll(" ", "%20");
            await fetch(`http://localhost:3001?message=${textFieldText}`);
        }
    }

    return (
        <div>
            <h2>Make the bot say something stupid:</h2>
            <form>
                <input type="text" ref={textFieldRef} /><br />
                <button onClick={onClickButton} type="submit">send</button>
            </form>
        </div>
    );
}

export default App;
