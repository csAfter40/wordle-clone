import React from "react";

export default function Letter({letter, addLetter}){
    return (
        <div className="keyboard-letter" onClick={()=>addLetter(letter)}>
            <h3>{letter}</h3>
        </div>
    )
}