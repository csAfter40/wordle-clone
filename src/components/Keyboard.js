import React from "react";
import Letter from "./Letter";

export default function Keyboard({addLetter, registerWord, deleteLetter}){ 
    const firstLine = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const secondLine = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const thirdLine = ["Z", "X", "C", "V", "B", "N", "M"];

    return (
        <div className="keyboard">
            <div className="keyboard-line">
                {firstLine.map((letter, i) => {
                    return (
                        <Letter 
                            key={i}
                            letter={letter}
                            addLetter={addLetter}
                        />
                    )
                })}
            </div>
            <div className="keyboard-line">
                {secondLine.map((letter, i) => {
                    return (
                        <Letter 
                            key={i}
                            letter={letter}
                            addLetter={addLetter}
                        />
                    )
                })}
            </div>
            <div className="keyboard-line">
                <div className="keyboard-letter function" onClick={registerWord}>
                    <h3>Enter</h3>
                </div>
                {thirdLine.map((letter, i) => {
                    return (
                        <Letter 
                            key={i}
                            letter={letter}
                            addLetter={addLetter}
                        />
                    )
                })}
                <div className="keyboard-letter function" onClick={deleteLetter}>
                    <h3>{"<"}</h3>
                </div>
            </div>
        </div>
    )
}