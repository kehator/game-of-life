/**
 * Define Cell interface
 */
interface Cell
{
    x: number
    y: number
}

/***
 * Define Game Class
 */
export default class Game
{
    /**
     * Define size of initial board
     */
    public initialBoardSize: number

    /**
     * Define board seed ratio [min 0 max 1] (how many live cells will be in the board)
     */
    public seedRatio: number

    /**
     * Define board
     * @private
     */
    private board: Map<string, Cell>

    /**
     * Game Class constructor
     *
     * @param size{number}
     * @param seedRatio{number}
     */
    constructor( size: number = 5, seedRatio: number = 0.5 )
    {
        this.initialBoardSize = size
        this.seedRatio = seedRatio
    }

    /**
     * Game start method
     */
    public startGame(): void
    {
        this.board = new Map()

        this.seedBoard()

        setInterval( (): void => {
            this.evolution()
        }, 1000 )
    }

    /**
     * Return current evolution state of cells
     *
     * @returns {Cell[]}
     */
    public getState(): Cell[]
    {
        return this.getBoardCells()
    }

    /**
     * Start evolution
     */
    private evolution(): void
    {
        const newBoard: Map<string, Cell> = new Map()
        const cells: Cell[] = this.getBoardCells()

        for ( const cell of cells ) {
            this.cellNextGenerationState( cell.x, cell.y ) ? newBoard.set( `${ cell.x }:${ cell.y }`, { x: cell.x, y: cell.y } ) : null
            this.cellNextGenerationState( ( cell.x + 1 ), cell.y ) ? newBoard.set( `${ ( cell.x + 1 ) }:${ cell.y }`, { x: ( cell.x + 1 ), y: cell.y } ) : null
            this.cellNextGenerationState( ( cell.x + 1 ), ( cell.y - 1 ) ) ? newBoard.set( `${ ( cell.x + 1 ) }:${ ( cell.y - 1 ) }`, { x: ( cell.x + 1 ), y: ( cell.y -1 ) } ) : null
            this.cellNextGenerationState( ( cell.x ), ( cell.y - 1 ) ) ? newBoard.set( `${ cell.x }:${ ( cell.y - 1 ) } }`, { x: cell.x, y: ( cell.y - 1 ) } ) : null
            this.cellNextGenerationState( ( cell.x - 1 ), ( cell.y - 1 ) ) ? newBoard.set( `${ ( cell.x - 1 ) }:${ ( cell.y - 1 ) }`, { x: ( cell.x - 1 ), y: ( cell.y - 1 ) } ) : null
            this.cellNextGenerationState( ( cell.x - 1 ), ( cell.y ) ) ? newBoard.set( `${ ( cell.x - 1 ) }:${ cell.y }`, { x: ( cell.x - 1 ), y: cell.y } ) : null
            this.cellNextGenerationState( ( cell.x - 1 ), ( cell.y + 1 ) ) ? newBoard.set( `${ ( cell.x - 1 ) }:${ ( cell.y + 1 ) }`, { x: ( cell.x - 1 ), y: ( cell.y + 1 ) } ) : null
            this.cellNextGenerationState( ( cell.x + 1 ), ( cell.y + 1 ) ) ? newBoard.set( `${ ( cell.x + 1 ) }:${ ( cell.y + 1 ) }`, { x: ( cell.x + 1 ), y: ( cell.y + 1 ) } ) : null
        }

        this.board = newBoard
    }

    private cellNextGenerationState( x: number, y: number ): boolean
    {
        let aliveNeighboursCount: number = 0
        const isCellAlive: boolean = this.board.has( `${ x }:${ y }` )

        this.board.has( `${ ( x + 1 ) }:${ y }` ) ? aliveNeighboursCount += 1 : null
        this.board.has( `${ ( x + 1 ) }:${ ( y - 1 ) }` ) ? aliveNeighboursCount += 1 : null
        this.board.has( `${ x }:${ ( y - 1 ) }` ) ? aliveNeighboursCount += 1 : null
        this.board.has( `${ ( x - 1 ) }:${ ( y - 1 ) }` ) ? aliveNeighboursCount += 1 : null
        this.board.has( `${ ( x - 1 ) }:${ y }` ) ? aliveNeighboursCount += 1 : null
        this.board.has( `${ ( x - 1 ) }:${ ( y + 1 ) }` ) ? aliveNeighboursCount += 1 : null
        this.board.has( `${ x }:${ ( y + 1 ) }` ) ? aliveNeighboursCount += 1 : null
        this.board.has( `${ ( x + 1 ) }:${ ( y + 1 ) }` ) ? aliveNeighboursCount += 1 : null

        if ( isCellAlive && ( aliveNeighboursCount === 2 || aliveNeighboursCount === 3 ) ) return true
        return !isCellAlive && aliveNeighboursCount === 3;
    }

    /**
     * Populate board with random values
     */
    private seedBoard(): void
    {
        for ( let x: number = 0; x < this.initialBoardSize; x++ ) {
            for ( let y: number = 0; y < this.initialBoardSize; y++ ) {
                if ( Math.random() <= this.seedRatio ) {
                    this.board.set( `${ x }:${ y }`, { x, y } )
                }
            }
        }

        if ( this.board.size === 0 ) {
            console.log( 'initializing board went wrong' )
            this.board.set( `0:0`, { x: 0, y: 0 } )
            this.board.set( `1:0`, { x: 1, y: 0 } )
            this.board.set( `2:0`, { x: 2, y: 0 } )
        }
    }

    /**
     * Get board cells
     */
    private getBoardCells(): Cell[]
    {
        return Array.from( this.board.values() )
    }
}
