import { useState, useEffect } from 'react';
import Header from "./components/Header";
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

function App() {

  const[gameList, setGameList] = useState([]);
  const[topGames, setTopGames] = useState([]);
  const[search, setSearch] = useState("");
  const[isLoading, setIsLoading] = useState(false);

  const getTopGames = async () => {

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '08341305e2msha1198b515e93baep1f0f32jsn8dc6cfd18d3f',
        'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
      }
    };
    
    const temp = await fetch('https://opencritic-api.p.rapidapi.com/game/popular', options)
      .then(response => response.json());

      setTopGames(temp.slice(0,10));
  }

  const handleSearch = e => {
    e.preventDefault();
    setIsLoading(true);
    fetchGames(search);
  }

  const fetchGames = async(query) => {

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '08341305e2msha1198b515e93baep1f0f32jsn8dc6cfd18d3f',
        'X-RapidAPI-Host': 'game-prices.p.rapidapi.com'
      }
    };

    const temp = await fetch(`https://game-prices.p.rapidapi.com/games?title=${query}&region=us&offset=0&limit=25`, options)
      .then(response => response.json());

      console.log(temp.games);
      if(temp.games){
        setGameList(temp.games.filter(game => game.stores.length > 2));
      } else {
        setGameList([])
      }
      //setGameList(temp.games.filter(game => game.stores.length > 2));
      setIsLoading(false);
  }

  useEffect(() => {
    getTopGames();
  },[]);

  console.log(gameList);

  return (
    <div className="App">
        <Header/>
        <div className='content-wrap'>
          <Sidebar topGames={topGames} />
          <MainContent 
          handleSearch={handleSearch}
          search={search}
          setSearch={setSearch}
          gameList={gameList}
          isLoading={isLoading}
          />
        </div>
    </div>
  );
}

export default App;
