/*
    - Gameboard Factory + Instance
        - variable: grid
        - methods: reset, makeMove

    - Player Factory + 2 Instances
        - variable: name, score

    - Gameflow controller
*/


function createGameBoard(){
    const grid = [
        ['.', '.', '.'],
        ['.', '.', '.'],
        ['.', '.', '.']
    ]

    const resetGrid = ()=>{
        for (const row in grid){
            for(const col in grid[i]){
                grid[row][col] = '.'
            }
        }
    }

    const makeMove = (row, col, string)=>{
        grid[row][col] = string
    }

    const viewGrid = ()=>{
        for (const row of grid){
            const ROW = row.join(' ')
            console.log(ROW)
        }
    }

    return {
        resetGrid, makeMove, viewGrid
    }

}

const gameBoard = createGameBoard()



