import words from "an-array-of-english-words";
import React from "react";
import { getRandomElement } from "./utils";
import Word from "./components/Word";
import Keyboard from "./components/Keyboard";

function App() {
  // var words = require('an-array-of-english-words')

  const fiveLetterWords = words.filter((word) => word.length === 5)
  const [secretWord, setSecretWord] = React.useState(getRandomElement(fiveLetterWords));
  const [answers, setAnswers] = React.useState([
    {text: "QWERT", registered: false},
    {text: "", registered: false},
    {text: "", registered: false},
    {text: "", registered: false},
    {text: "", registered: false},
    {text: "", registered: false},
  ])
  const [currentIndex, setCurrentIndex] = React.useState(0);

  function registerWord(index, text){
    setAnswers((prevAnswers)=>{
      const newAnswers = prevAnswers.map((answer, i) => {
        return (i === index ? {text: text, registered: true}: answer)
      })
    });
    index < 5 && setCurrentIndex((prevIndex) => prevIndex + 1)
  }

  return (
    <div className="App">
      <div className="board">
        {answers.map((answer, i)=>{
          return(
            <Word 
              key={i}
              answer={answer}
              registerWord={registerWord}
              index={i}
              isCurrentIndex={currentIndex === i}
            />
          )
        })}
      </div>
      <Keyboard />
    </div>
  );
}

export default App;
