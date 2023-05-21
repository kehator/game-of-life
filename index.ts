import express from 'express'

const app: express.Application = express()
const port: number = 3000

// Handling '/' Request
app.get( '/', ( req, res ): void => {
    res.send( '"Conway\'s Game Of Life" - TypeScript With Express' )
} )

// Server setup
app.listen( port, (): void => {
    console.log( `Server listening on port ${ port }` )
} )
