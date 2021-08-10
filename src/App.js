import axios from 'axios';
import './App.css';
import {useState, useEffect} from 'react';
import {Container, Switch, withStyles} from '@material-ui/core';
import Header from './component/Header/Header';
import Definition from './component/Definitions/Definition';
import { grey } from '@material-ui/core/colors';

function App() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState([]);
  const [category, setCategory] = useState("en");

  const PurpleSwitch = withStyles({
  switchBase: {
    color: grey[300],
    '&$checked': {
      color: grey[500],
    },
    '&$checked + $track': {
      backgroundColor: grey[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

  const dictionaryApi = async () =>{
    try {
      const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`);  

  // console.log(data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dictionaryApi();
  }, [word, category])

  return (
    <div className="App" 
      style ={{height: '100vh', backgroundColor: '#282c34', color: 'white'}}>

      <Container maxWidth= "md"
        style = {{display : "flex", flexDirection: "column", height: "100v"}}
      >
      <Header category = {category} setCategory = {setCategory} word ={word} setWord={setWord}/>
      {meaning && (
        <Definition word={word} meaning={meaning}/>)}
      </Container>
    </div>
  );
}

export default App; 