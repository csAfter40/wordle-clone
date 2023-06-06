import React from "react";
import { getRandomElement } from "./utils";
import Word from "./components/Word";
import {words} from "popular-english-words"
import Keyboard from "./components/Keyboard";
import Settings from "./components/Settings";
import turkishWords from "./turkishWords";

function App() {
  const [letterCount, setLetterCount] = React.useState(6);
  const [wordsPool, setWordsPool] = React.useState([]);
  const [allWords, setAllWords] = React.useState([]);
  const [secretWord, setSecretWord] = React.useState("");
  const [answers, setAnswers] = React.useState(getNewAnswers())
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = React.useState(0);
  const [selectedLetters, setSelectedLetters] = React.useState([]);
  const [gameFinished, setGameFinished] = React.useState(false);
  const [gameWon, setGameWon] = React.useState(false);
  const [hasGameStarted, setHasGameStarted] = React.useState(false);
  const [language, setLanguage] = React.useState("TR");

  React.useEffect(()=>{
    setAnswers(getNewAnswers())
  },[letterCount])

  React.useEffect(()=>{
    setSecretWord(getRandomElement(wordsPool).toLocaleUpperCase(language));
  },[wordsPool])

  React.useEffect(()=>{
    switch(language) {
      case "EN":
        setWordsPool(words.getMostPopularLength(300, letterCount));
        setAllWords(words.getAll().filter((word) => word.length === letterCount));
        break;
      case "TR":
        setWordsPool(turkishWords.filter((word) => word.length === letterCount));
        setAllWords(turkishWords.filter((word) => word.length === letterCount));
        break;
    }
  },[language, letterCount])


  function getNewAnswers(){
    let answersArray = [];
    for (let i = 0; i<6; i++){
      answersArray.push(
        {wordArray: new Array(letterCount).fill(""), isRegistered: false}
      )
    };
    return answersArray;
  }

  function isMatching(array){
    const match = array.every((letter, i) => secretWord[i]===letter)
    return match
  }

  function finishGame() {
    setGameFinished(true);
    isMatching(answers[currentWordIndex].wordArray) && setGameWon(true);
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

  function convertToString(array){
    let word = "";
    array.forEach((letter) => word = word + letter)
    return word
  }

  function showWordAlert(){
    const alert = document.querySelector('#alert-message');
    alert.style.display = "block";
    setTimeout(()=>{
      alert.style.display = "none";
    }, 1000)
  }

  function isInWordList(wordArray){
    const word = convertToString(wordArray);
    !allWords.includes(word.toLocaleLowerCase(language)) && showWordAlert()
    return allWords.includes(word.toLocaleLowerCase(language))
  }

  function registerWord(){
    if(currentLetterIndex===letterCount && isInWordList(answers[currentWordIndex].wordArray)){
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
    !gameFinished && currentLetterIndex < letterCount && setAnswers((prevAnswers) => {
      let newAnswers = [...prevAnswers];
      let newWordArray = newAnswers[currentWordIndex].wordArray;
      newWordArray[currentLetterIndex] = newWordArray[currentLetterIndex] ? newWordArray[currentLetterIndex] : letter;
      newAnswers[currentWordIndex] = {wordArray: newWordArray, isRegistered:false};
      return newAnswers
    })
    setCurrentLetterIndex((prevIndex) => prevIndex < letterCount ? prevIndex + 1 : prevIndex)
  }

  function deleteLetter(){
    if (currentLetterIndex>0 && !gameFinished){
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

  function restartGame(){
    setSecretWord(getRandomElement(wordsPool).toLocaleUpperCase(language));
    setAnswers(getNewAnswers());
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);
    setGameFinished(false);
    setSelectedLetters([]);
    setGameWon(false);
  }

  function goToSettings(){
    restartGame();
    setHasGameStarted(false);
  }

  return (
    hasGameStarted ? 
    <div className="App">
      <div className="board-header">
        <h1>Wordle Clone</h1>
      </div>
      <div className="board">
        <div id="alert-message" >
          <p>Not in word list</p>
        </div>
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
        language={language}
      />
      <div className="game-over-text" style={{display: gameFinished && !gameWon ? "flex" : "none"}}>
        <p>{`Word was "${secretWord}"`}</p>
      </div>
      <div className="button-container">
        <div onClick={restartGame} className="restart-button" style={{display: gameFinished ? "flex" : "none"}}>
          <h3>Restart Game</h3>
        </div>
        <div onClick={goToSettings} className="settings-button" style={{display: gameFinished ? "flex" : "none"}}>
          <h3>Settings</h3>
        </div>
      </div>
    </div> :
    <Settings 
        setHasGameStarted={setHasGameStarted}
        setLetterCount={setLetterCount}
        setLanguage={setLanguage}
    />
  );
}

export default App;
