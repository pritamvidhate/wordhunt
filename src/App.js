import axios from 'axios';
import './App.css';
import {useState, useEffect} from 'react';
import {Container, Switch, withStyles} from '@material-ui/core';
import Header from './component/Header/Header';
import Definition from './component/Definitions/Definition';
import { grey } from '@material-ui/core/colors';

function App() {
  const [word, setWord] = useState("");
  const [meanings, setMeanings] = useState([]);
  const [category, setCategory] = useState("en");
  const [lightMode, setLightMode] = useState(false)

  const dictionaryApi = async () =>{
    try {
      const data = await axios
          .get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`);  

  // console.log(data);
      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dictionaryApi();
    // eslint-disable-next-line
  }, [word, category])

  const DarkMode = withStyles({
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

  return (
    <div className="App" 
      style ={{height: '100vh', 
              backgroundColor:lightMode ? "#fff" : '#282c34',   
              color:lightMode ? "black" : "white",
              transition: "all 0.3s linear"}}>

      <Container maxWidth= "md"
        style = {{display : "flex", flexDirection: "column", height: "100v", justifyContent: "space-evenly"}}
      >
    
      <div style ={{position:"absolute", top:0, right: 15, paddingTop:10 }}>
      
        <span>{lightMode ? "dark" : "light"}mode</span>
      <DarkMode 
        checked ={lightMode}
        onChange={() => setLightMode(!lightMode)}
      />
      </div>
      <Header 
        category = {category} 
        setCategory = {setCategory} 
        word ={word} 
        setWord={setWord}
        lightMode={lightMode}
      />
      {meanings && (
        <Definition 
          word={word} 
          meanings={meanings} 
          lightMode={lightMode}
          category={category}
          />)}
      </Container>
    </div>
  );
}

export default App; 