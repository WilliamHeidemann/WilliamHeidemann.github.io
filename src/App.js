import './App.css';
import wordsCSV from './words.csv'
import {useEffect, useState} from "react";

// Before npm can run: cd .\taboo-app\
// For dev: npm start
// For publishing: npm run deploy

function App() {
  const [words, setWords] = useState([]);
  const [displayPoints, setDisplayPoints] = useState(0)
  const [bluePoints, setBluePoints] = useState(0);
  const [pinkPoints, setPinkPoints] = useState(0);
  const [bgColor, setBgColor] = useState('#CF4D6F');
  const [isBlueTurn, setIsBlueTurn] = useState(false);


  const fetchWords = async () => {
    const response = await fetch(wordsCSV);
    const text = await response.text();
    const lines = text.split('\n');
    const lineToRead = Math.floor(Math.random() * lines.length);
    const readWords = lines[lineToRead].split(',').slice(0, 6);
    upperEachWord(readWords);
    setWords(readWords);
    return readWords;
  };
  function upperEachWord(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
  }



  const incrementPoints = () => {
    isBlueTurn ? setBluePoints(bluePoints + 1) : setPinkPoints(pinkPoints + 1)
  }
  useEffect(() => {
    setDisplayPoints(isBlueTurn ? bluePoints : pinkPoints)
  }, [bluePoints, pinkPoints])

  const handleToggle = () => {
    setIsBlueTurn(!isBlueTurn)
  };
  useEffect(() => {
    setBgColor(isBlueTurn ? '#CF4D6F' : '#4381C1')
    setDisplayPoints(isBlueTurn ? bluePoints : pinkPoints)
  }, [isBlueTurn])

  const nextWord = () => {
    fetchWords();
  };

  useEffect(() => {
    fetchWords();
  }, []);


  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: bgColor }}>
        <div className="toggle-container">
          <input type="checkbox" id="toggle" className="toggle-checkbox" onChange={handleToggle}/>
            <label htmlFor="toggle" className="toggle-label"></label>
        </div>
        <h1>{words[0]}</h1>
        <p>{words[1]}</p>
        <p>{words[2]}</p>
        <p>{words[3]}</p>
        <p>{words[4]}</p>
        <p>{words[5]}</p>
        <br></br>
        <button className="button" onClick={() => {
          incrementPoints()
          nextWord()
        }}>Correct</button>
        <button className="button" onClick={nextWord}>Skip</button>
        <p>Points: {displayPoints}</p>
      </header>
    </div>
  );
}
export default App;