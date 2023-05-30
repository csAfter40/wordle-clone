import React  from "react";

export default function Word({answer, isCurrentIndex}) {
    return (
        <div className="word-container">
            {answer.wordArray.map((letter, i)=>{
                return (
                    <div className="letter" key={i}>
                        <h3>{letter}</h3>
                    </div>
                )
            })}
        </div>
    )
}