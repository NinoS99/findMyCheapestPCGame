import React from 'react'

function Sidebar({ topGames }) {
  // console.log(topGames)
  return (
    <aside>
        <nav>
            <h3> Popular Games</h3>
            {topGames.map(game  => (
              <a 
                href={`https://opencritic.com/game/${game.id}/${game.name.replace(/\s+/g, '-').toLowerCase()}`}
                target="_blank"
                key={game.id}
                rel='noreferrer'>
                {game.name}
                <h1></h1>
                <h4> Rating: {Math.round(game.topCriticScore)} </h4>
              </a>
            ))}

        </nav>
    </aside>
  )
}

export default Sidebar