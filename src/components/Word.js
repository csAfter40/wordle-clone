import React  from "react";

export default function Word({answer, registerWord, index, isCurrentIndex}) {
    const wordArray = answer.text ? [...answer.text]: ["", "", "", "", ""];
    const [word, setWord] = React.useState(wordArray);
    console.log(word)
    return (
        <div className="word-container">
            {word.map((letter)=>{
                return (
                    <div className="letter">
                        <h3>{letter}</h3>
                    </div>
                )
            })}
        </div>
    )
}