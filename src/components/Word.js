import React  from "react";

export default function Word({answer, isCurrentIndex, secretWord}) {
    
    return (
        <div className="word-container">
            {answer.wordArray.map((letter, i)=>{
                return (
                    <div 
                        className={!answer.isRegistered ? "letter": 
                            secretWord[i] === letter ? "letter correct-place":
                                secretWord.includes(letter) ? "letter incorrect-place":
                                    "letter not-available"
                        } 
                        key={i}
                    >
                        <h3>{letter}</h3>
                    </div>
                )
            })}
        </div>
    )
}