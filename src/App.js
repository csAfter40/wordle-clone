import words from "an-array-of-english-words";
import React from "react";
import { getRandomElement } from "./utils";
import Word from "./components/Word";
import Keyboard from "./components/Keyboard";

function App() {
  // var words = require('an-array-of-english-words')
  
  const fiveLetterWords = words.filter((word) => word.length === 5)
  const [secretWord, setSecretWord] = React.useState(getRandomElement(fiveLetterWords).toUpperCase());
  const [answers, setAnswers] = React.useState([
    {wordArray: ["", "", "", "", ""], isRegistered: false},
    {wordArray: ["", "", "", "", ""], isRegistered: false},
    {wordArray: ["", "", "", "", ""], isRegistered: false},
    {wordArray: ["", "", "", "", ""], isRegistered: false},
    {wordArray: ["", "", "", "", ""], isRegistered: false},
    {wordArray: ["", "", "", "", ""], isRegistered: false},
  ])
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = React.useState(0);
  const [selectedLetters, setSelectedLetters] = React.useState([]);
  
  
  function isMatching(array){
    const match = array.every((letter, i) => secretWord[i]===letter)
    return match
  }

  function finishGame(wordIndex) {
    console.log("game finished")
  }

  function addLettersToSelected(wordArray){
    setSelectedLetters((prevLetters) => {
      let newLetters = [...prevLetters];
      wordArray.forEach((letter) => {
        !newLetters.includes(letter) && newLetters.push(letter)
      })
      return newLetters
    })
  }

  function registerWord(){
    if(currentLetterIndex===5){
      setAnswers((prevAnswers)=>{
        let newAnswers = [...prevAnswers]
        let prevAnswer = prevAnswers[currentWordIndex]
        newAnswers[currentWordIndex] = {...prevAnswer, isRegistered:true}
        return newAnswers
      });
      currentWordIndex < 5 && setCurrentWordIndex((prevIndex) => prevIndex + 1)
      setCurrentLetterIndex(0);
      (isMatching(answers[currentWordIndex].wordArray) || currentWordIndex === 5) && finishGame(currentWordIndex) ;
      addLettersToSelected(answers[currentWordIndex].wordArray)
    }
  }

  function addLetter(letter) {
    currentLetterIndex<5 && setAnswers((prevAnswers) => {
      let newAnswers = [...prevAnswers];
      let newWordArray = newAnswers[currentWordIndex].wordArray;
      newWordArray[currentLetterIndex] = newWordArray[currentLetterIndex] ? newWordArray[currentLetterIndex] : letter;
      newAnswers[currentWordIndex] = {wordArray: newWordArray, isRegistered:false};
      return newAnswers
    })
    setCurrentLetterIndex((prevIndex) => prevIndex<5 ? prevIndex+1 : prevIndex)
  }

  function deleteLetter(){
    if (currentLetterIndex>0){
      setAnswers((prevAnswers) => {
        let newAnswers = [...prevAnswers];
        let newWordArray = newAnswers[currentWordIndex].wordArray;
        newWordArray[currentLetterIndex-1] = "";
        newAnswers[currentWordIndex] = {wordArray: newWordArray, isRegistered:false};
        return newAnswers;
      })
      setCurrentLetterIndex((prevIndex) => prevIndex - 1)
    }
  }

  return (
    <div className="App">
      <div className="board">
        {answers.map((answer, i)=>{
          return(
            <Word 
              key={i}
              answer={answer}
              isCurrentIndex={currentWordIndex === i}
              secretWord={secretWord}
            />
          )
        })}
      </div>
      <Keyboard 
        registerWord={registerWord}
        addLetter={addLetter}
        deleteLetter={deleteLetter}
        secretWord={secretWord}
        selectedLetters={selectedLetters}
      />
    </div>
  );
}

export default App;
