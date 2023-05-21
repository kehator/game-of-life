import express from 'express'
import Game from './src/game'

const app: express.Application = express()
const port: number = 3000
const game: Game = new Game()

// Handling '/' Request
app.get( '/', ( req, res ): void => {
    res.send( {
        title: '"Conway\'s Game Of Life" - TypeScript With Express',
        data: game.getState()
    } )
} )

// Server setup
app.listen( port, (): void => {
    console.log( `Server listening on port ${ port }` )

    game.startGame()
} )
