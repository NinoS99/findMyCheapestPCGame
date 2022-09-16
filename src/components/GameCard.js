import React, { useState, useEffect } from 'react'

function GameCard({ game }) {
  
  const [openCriticId, setOpenCriticID] = useState('');  
  const [gameImg, setGameImg] = useState('');


  const getOpenCriticId = async () => {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '08341305e2msha1198b515e93baep1f0f32jsn8dc6cfd18d3f',
            'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
        }
    };

    const queryName = game.name.replace(/\s+/g, '%20').toLowerCase()

    const temp = await fetch(`https://opencritic-api.p.rapidapi.com/game/search?criteria=${queryName}`, options)
    .then(response => response.json());

    setOpenCriticID(temp[0].id);
  }

  const getGameImg = async () => {

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '08341305e2msha1198b515e93baep1f0f32jsn8dc6cfd18d3f',
            'X-RapidAPI-Host': 'opencritic-api.p.rapidapi.com'
        }
    };

    const temp = await fetch(`https://opencritic-api.p.rapidapi.com/game/${openCriticId}`, options)
    .then(response => response.json());

    setGameImg(temp.verticalLogoScreenshot.fullRes);

  }

  useEffect(() => {
    getOpenCriticId();
  }, []);

  useEffect(() => {
    getGameImg();
  }, [openCriticId, game]);
  

  return (
    <article className='game-card'>
        <a>
            <figure>
            <h3>
                {game.name}
            </h3>
            <h4> 
                Cheapest Seller #1:
            </h4>
            <a href={game.stores[0].url} target="_blank">
                {game.stores[0].seller}: {game.stores[0].price} USD
            </a>
            <h4> 
                Cheapest Seller #2:
            </h4>
            <a href={game.stores[1].url} target="_blank">
                {game.stores[1].seller}: {game.stores[0].price} USD
            </a>
            <h4> 
                Cheapest Seller #3:
            </h4>
            <a href={game.stores[2].url} target="_blank">
                {game.stores[2].seller}: {game.stores[0].price} USD
            </a>
            </figure>
        </a>
    </article>
  )
}

export default GameCard