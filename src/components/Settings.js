import React from "react";
import Letter from "./Letter";

export default function Settings(){
    return(
        <div className="settings-container">
            <div className="word-container">
                {[..."WORDLE"].map((letter, i) => {
                    return (
                        <div 
                        className="letter correct-place" 
                        key={i}
                    >
                        <h3>{letter}</h3>
                    </div>
                    )
                })}
            </div>
            <div className="word-container">
                {[..."CLONE"].map((letter, i) => {
                    return (
                        <div 
                        className="letter not-available" 
                        key={i}
                    >
                        <h3>{letter}</h3>
                    </div>
                    )
                })}
            </div>
            <div className="form-container">
                <h2>Settings</h2>
                <div className="input-container">
                    <h3 className="input-label">Letter Count:</h3>
                    <select name="letter-count" id="letter-count-input">
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </div>
                <div className="input-container">
                    <h3 className="input-label">Difficulty:</h3>
                    <select name="difficulty" id="difficulty-input">
                        <option value="easy">Easy</option>
                        <option value="normal">Normal</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="input-container">
                    <h3 className="input-label">Language:</h3>
                    <select name="language" id="language-input">
                        <option value="english">English</option>
                        <option value="turkish">Turkish</option>
                    </select>
                </div>
            </div>
            <div className="start-button">
                <h2>Start Game</h2>
            </div>
        </div>
    )
}