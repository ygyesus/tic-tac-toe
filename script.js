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
    ];

    const resetGrid = ()=>{
        for (const row in grid){
            for(const col in grid[i]){
                grid[row][col] = '.';
            }
        }
    };

    const makeMove = (row, col, string)=>{
        if (grid[row][col] !== '.'){
            alert("cell already occupied!");
            return;
        } 
        grid[row][col] = string;
    }

    const viewGrid = ()=>{
        for (const row of grid){
            console.log(row);
        }
    }

    const isGameOver = ()=>{
        console.log("checking if game is over....");



        // check three rows
        for(let x in grid){
            const row = grid[x];
            
            counter = {
                'X': 0,
                'O': 0,
            };

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
        if(grid[0][2] === 'O' && grid[1][1] === 'O' && grid[2][0] === 'O'){
            return true;
        }
        if(grid[0][2] === 'X' && grid[1][1] === 'X' && grid[2][0] === 'X'){            
            return true;
        }

        console.log("Nope, not over yet!")
        return false
    }
    

    return {
        resetGrid, 
        makeMove, 
        viewGrid, 
        isGameOver
    };

}


(function createGame(){

    const gameBoard = createGameBoard();
    
    gameBoard.viewGrid();
    let move = 'O';
    let count = 0;

    while (true){
        console.log("===========================");
        
        coordinates = prompt("Coordinates: ");
        let row;
        let col;
        [row,col] = coordinates.split(" ")
        row = Number(row)-1
        col = Number(col)-1
        console.log(row, col)

        if (row<0 || row>2  || col<0 || col>2){
            alert("Please use ranges 1-3 for rows and cols")
            continue

        }

        gameBoard.makeMove(row, col, move);
        count++;

        if (gameBoard.isGameOver()) {
            gameBoard.viewGrid();

            console.log(`Game Over! ${move} wins!`);
            alert(`Game Over! ${move} wins!`)
            // global.alert("GAME OVER")
            
            break
        
        } else if(count===9){
            gameBoard.viewGrid();
            console.log("It's a tie!");
            alert("It's a tie!");
            break;

        }
        
        // for (let row in grid){
        //     for (let col in grid){
                
        //     }
        // }
        if (move === 'O'){
            move = 'X'
        } else {
            move = 'O';
        }
        gameBoard.viewGrid();

    }


    (function promptUserAfterGame(){
        let char = prompt(`Wanna play more? (y/n)`);
        if (char.toLowerCase() === 'y'){
            createGame();
        } else if (char.toLowerCase() === 'n'){
            return;
        } else{
            alert("Invalid key. Please input y/n");
            promptUserAfterGame();
        }
    })()



})()

// create first player - name, score, string
// attach 'X' to first player

// create second player - name, sore, string
// attach 'O' to second player


// for each move, console.log(<FIRST_PLAYER> <FIRST_PLAYER.score> - <SECOND_PLAYER.score> <SECOND_PLAYER)
// If a player won:
    // announce winner after end and the score so far
// Else:
    // announce the tie and the score so far
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

// createGame()







