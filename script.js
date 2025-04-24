/*
    - Gameboard Factory + Instance
        - variable: grid
        - methods: resetGrid, makeMove, viewGrid, isGameOver

    - Player Factory + 2 Instances
        - variable: name, score
        - methods: makeMove

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
        if (grid[row][col] !== '.'){
            console.log("cell already occupied!")
            return
        } 
        grid[row][col] = string
    }

    const viewGrid = ()=>{
        for (const row of grid){
            console.log(row)
        }
    }

    const isGameOver = ()=>{
        console.log("checking if game is over....")



        // check three rows
        for(let x in grid){
            const row = grid[x]
            
            counter = {
                'X': 0,
                'O': 0,
            }

            for (const col in row){
                if (row[col] === 'X' || row[col] === 'O'){
                    counter[row[col]] += 1
                    if (counter[row[col]]===3){
                        return true
                    }
                }
            }
        }



        // check three cols
        for (let col = 0; col<3; col++){
            if (grid[0][col] === 'O' && grid[1][col] === 'O' && grid[2][col] === 'O'){
                return true
            }
            if (grid[0][col] === 'X' && grid[1][col] === 'X' && grid[2][col] === 'X'){
                return true
            }
        }

        // check NW => SE diagonal
        if (grid[0][0] === 'O' && grid[1][1] === 'O' && grid[2][2] === 'O'){
            return true
        }
        if (grid[0][0] === 'X' && grid[1][1] === 'X' && grid[2][2] === 'X'){
            return true
        }
        
        // check SW => NE diagonal
        if(grid[0][2] === grid[1][1] === grid[2][0] === 'O'){
            return true
        }
        if(grid[0][2] === grid[1][1] === grid[2][0] === 'X'){
            return true
        }

        console.log("Nope, not over yet!")
        return false
    }
    

    return {
        resetGrid, 
        makeMove, 
        viewGrid, 
        isGameOver
    }

}


function createGame(){

    const gameBoard = createGameBoard()
    
    gameBoard.viewGrid()
    let move = 'O'

    while (true){
        console.log("===========================")
        
        coordinates = prompt("Coordinates: ")
        let row;
        let col;
        [row,col] = coordinates.split(" ")
        row = Number(row)-1
        col = Number(col)-1
        console.log(row, col)

        if (row<0 || row>2  || col<0 || col>2){
            console.log("Please use ranges 1-3 for rows and cols")
            continue

        }

        gameBoard.makeMove(row, col, move)

        if (gameBoard.isGameOver()) break
        if (move === 'O'){
            move = 'X'
        } else {
            move = 'O'
        }
        gameBoard.viewGrid()

    }

    console.log("Game Over!", move, "wins!")

    let char = prompt("wanna play more? (y/n)")
    if (char === 'y'){
        createGame()
    } else{
        return
    }

}

function createPlayer(name, string, gameBoard){
    let score = 0;

    function makeMove(row, col){
        gameBoard.makeMove(row, col, string)
    }

    return {
        name, 
        score,
        makeMove
    }

}

createGame()







