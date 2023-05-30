import React from "react";

export default function Keyboard(){ 
    const firstLine = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const secondLine = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const thirdLine = ["Z", "X", "C", "V", "B", "N", "M"];
    return (
        <div className="keyboard">
            <div className="keyboard-line">
                {firstLine.map((letter) => {
                    return (
                        <div className="keyboard-letter">
                            <h3>{letter}</h3>
                        </div>
                    )
                })}
            </div>
            <div className="keyboard-line">
                {secondLine.map((letter) => {
                    return (
                        <div className="keyboard-letter">
                            <h3>{letter}</h3>
                        </div>
                    )
                })}
            </div>
            <div className="keyboard-line">
                <div className="keyboard-letter function">
                    <h3>Enter</h3>
                </div>
                {thirdLine.map((letter) => {
                    return (
                        <div className="keyboard-letter">
                            <h3>{letter}</h3>
                        </div>
                    )
                })}
                <div className="keyboard-letter function">
                    <h3>{"<"}</h3>
                </div>
            </div>
        </div>
    )
}