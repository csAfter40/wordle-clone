import React  from "react";

export default function Word({answer, isCurrentIndex, secretWord}) {
    
    // letter color logic
    let secretWordArray = [...secretWord];
    let answerWordArray = [...answer.wordArray];
    let letterClassArray = answer.wordArray.map((letter)=>"letter not-available");
    secretWordArray.forEach((letter, i)=>{
        if (letter === answer.wordArray[i]) {
            letterClassArray[i] = "letter correct-place";
            secretWordArray[i] = ""
            answerWordArray[i] = ""
        };
    })
    secretWordArray.forEach((letter)=>{
        if(letter !== "") {
            if(answerWordArray.includes(letter)) {
                const index = answerWordArray.indexOf(letter);
                letterClassArray[index] = "letter incorrect-place";
                answerWordArray[index] = "";
            }
        }
    })

    return (
        <div className="word-container">
            {answer.wordArray.map((letter, i)=>{
                return (
                    <div 
                        className={!answer.isRegistered ? "letter": letterClassArray[i]} 
                        key={i}
                    >
                        <h3>{letter}</h3>
                    </div>
                )
            })}
        </div>
    )
}