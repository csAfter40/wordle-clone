import React from "react";

export default function Letter({letter, addLetter, secretWord, selectedLetters}){
    const letterClass = selectedLetters.includes(letter) ? 
        (secretWord.includes(letter) ? "includes" : "selected") : ""

    return (
        <div className={`keyboard-letter ${letterClass}`} onClick={()=>addLetter(letter)}>
            <h3>{letter}</h3>
        </div>
    )
}