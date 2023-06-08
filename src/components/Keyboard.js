import React from "react";
import Letter from "./Letter";

export default function Keyboard({language, addLetter, registerWord, deleteLetter, secretWord, selectedLetters}){ 
    const englishKeyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M"]
    ]
    const turkishKeyboard = [
        ["E", "R", "T", "Y", "U", "I", "O", "P", "Ğ", "Ü"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ş", "İ"],
        ["Z", "C", "V", "B", "N", "M", "Ö", "Ç"]
    ]

    let currentKeyboard;
    switch (language) {
        case "EN":
            currentKeyboard = englishKeyboard;
            break;
        case "TR":
            currentKeyboard = turkishKeyboard;
            break;
        default:
            currentKeyboard = englishKeyboard;
    }
    return (
        <div className="keyboard">
            <div className="keyboard-line">
                {currentKeyboard[0].map((letter) => {
                    return (
                        <Letter 
                            key={letter}
                            letter={letter}
                            addLetter={addLetter}
                            selectedLetters={selectedLetters}
                            secretWord={secretWord}
                        />
                    )
                })}
            </div>
            <div className="keyboard-line">
                {currentKeyboard[1].map((letter) => {
                    return (
                        <Letter 
                            key={letter}
                            letter={letter}
                            addLetter={addLetter}
                            selectedLetters={selectedLetters}
                            secretWord={secretWord}
                        />
                    )
                })}
            </div>
            <div className="keyboard-line">
                <div className="keyboard-letter function noselect" onClick={registerWord}>
                    <h3>Enter</h3>
                </div>
                {currentKeyboard[2].map((letter) => {
                    return (
                        <Letter 
                            key={letter}
                            letter={letter}
                            addLetter={addLetter}
                            selectedLetters={selectedLetters}
                            secretWord={secretWord}
                        />
                    )
                })}
                <div className="keyboard-letter function noselect" onClick={deleteLetter}>
                    <h3>{"<"}</h3>
                </div>
            </div>
        </div>
    )
}