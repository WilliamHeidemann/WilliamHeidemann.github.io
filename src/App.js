import './App.css';
import words from './words.csv'
import {useEffect, useState} from "react";

function App() {
  const [forbiddenWords, setForbiddenWords] = useState([]);

  const [points, setPoints] = useState(0);
  const incrementPoints = () => {
    setPoints(points + 1);
  };

  const fetchWords = async () => {
    const response = await fetch(words);
    const text = await response.text();
    const lines = text.split('\n');
    const lineToRead = Math.floor(Math.random() * 836);
    const readWords = lines[lineToRead].split(',').slice(0, 6); // get first 5 words of first line
    upperEachWord(readWords);
    setForbiddenWords(readWords);
    return readWords;
  };

  function upperEachWord(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
  }

  const [bgColor, setBgColor] = useState('#4381C1');

  const handleToggle = () => {
    setBgColor(bgColor === '#4381C1' ? '#CF4D6F' : '#4381C1');
  };


  useEffect(() => {
    fetchWords();
  }, []);

  const nextWord = () => {
    fetchWords();
  };


  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: bgColor }}>
        <div className="toggle-container">
          <input type="checkbox" id="toggle" className="toggle-checkbox" onChange={handleToggle}/>
            <label htmlFor="toggle" className="toggle-label"></label>
        </div>
        <h1>{forbiddenWords[0]}</h1>
        <p>{forbiddenWords[1]}</p>
        <p>{forbiddenWords[2]}</p>
        <p>{forbiddenWords[3]}</p>
        <p>{forbiddenWords[4]}</p>
        <p>{forbiddenWords[5]}</p>
        <br></br>
        <button className="button" onClick={() => {
          incrementPoints()
          nextWord()
        }}>Correct</button>
        <button className="button" onClick={nextWord}>Skip</button>
        <p>Points: {points}</p>
      </header>
    </div>
  );
}
export default App;