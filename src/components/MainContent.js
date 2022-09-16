import { Card, CircularProgress } from '@material-ui/core'
import React from 'react'
import GameCard from './GameCard';

function MainContent(props) {


  return (
    <main>
        <div className='main-head'>
            <form 
            className='search-box'
            onSubmit={props.handleSearch}
            >
                <input 
                    type="search"
                    placeholder='Search for a Game...'
                    required 
                    value={props.search}
                    onChange={e => props.setSearch(e.target.value)}
                    />     
            </form>
        </div>

        {props.isLoading ? (
        <div className='spinner-style'>
          <CircularProgress size="5rem" style={{'color' : 'grey'}}/>
        </div>
      ) : (
        <>
        <div className='game-list'>
            {props.gameList.map(game => (
                <GameCard
                    game={game}
                    key={game.id}
                />
            ))}     
        </div>
        </>
      )}
    </main>
  )
}

export default MainContent