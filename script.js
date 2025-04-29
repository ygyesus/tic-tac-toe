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
            for(const col in grid[row]){
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

    const singleGameLogic = (playerOne, playerTwo)=>{
        let currPlayer = playerOne;
        gameBoard.viewGrid();
        let count = 0;
    
        while (true){
            console.log("===========================");
            
            coordinates = prompt("Coordinates: ");
            let row;
            let col;
            [row,col] = coordinates.split(" ");
            row = Number(row)-1;
            col = Number(col)-1;
            console.log(row, col);
    
            if (row<0 || row>2  || col<0 || col>2){
                alert("Please use ranges 1-3 for rows and cols");
                continue;
    
            }

            console.log(playerOne)
    
            currPlayer.makeMove(row, col);
            count++;
            gameBoard.viewGrid();
    
            if (gameBoard.isGameOver()) {
    
                console.log(`Game Over! ${currPlayer.getName()} wins!`);
                alert(`Game Over! ${currPlayer.getName()} wins!`)

                // winner: O, loser: X. loser goes
                let loser;

                if (currPlayer === playerTwo){
                    loser = playerOne;
                } else if (currPlayer === playerOne){
                    loser = playerTwo;
                }

                // global.alert("GAME OVER")
                
                return [currPlayer, loser];
            
            } else if(count===9){
                console.log("It's a tie!");
                alert("It's a tie!");
                
                return 0;
    
            }

            if (currPlayer === playerOne){
                currPlayer = playerTwo;
            } else if (currPlayer === playerTwo){
                currPlayer = playerOne;
            }
        }
    }

    function createPlayer(name, string, gameBoard){
        let score = 0;
    
        function makeMove(row, col){
            gameBoard.makeMove(row, col, string)
        }
    
        function setString(move){
            string = move;
        }
        function getName(){
            return name;
        }
        function getScore(){
            return score
        }
        function addScore(){
            score += 1;
        }
    
        return {
            getName, 
            getScore,
            makeMove,
            setString,
            addScore
        }
    }
    

    const playerOneName = prompt("PLAYER 1 - name please?");
    const playerTwoName = prompt("PLAYER 2 - name please?");
    
    playerOne = createPlayer(playerOneName, 'X', gameBoard);
    playerTwo = createPlayer(playerTwoName, 'O', gameBoard);

    if (playerOne === undefined || playerTwo === undefined){
        // return;
    }

    // let currPlayerOne = {...playerOne};
    // let currPlayerTwo = {...playerTwo};


    (function wholeGame(){
        

        while(true){
            let result = singleGameLogic(playerOne, playerTwo);
            if (result === 0){

            } else{
                let winner;
                let loser;
                [winner, loser] = result;
                winner.addScore();
            }            
            
            console.log(`${playerOne.getName()} ${playerOne.getScore()} - ${playerTwo.getScore()} ${playerTwo.getName()}`)        
        
            while(true){
                let char = prompt(`Wanna play more? (y/n)`);
                if (char.toLowerCase() === 'y'){
                    gameBoard.resetGrid();
                    break;
                } else if (char.toLowerCase() === 'n'){
                    return;
                } else{
                    alert("Invalid key. Please input y/n");
                }
            }

        }
    })()
})()

// create first player - name, score, string
// attach 'X' to first player

// create second player - name, sore, string
// attach 'O' to second player


// for each move, console.log(<FIRST_PLAYER> <FIRST_PLAYER.score> - <SECOND_PLAYER.score> <SECOND_PLAYER)
// If a player won:
//     announce winner after end and the score so far
// Else:
//     announce the tie and the score so far


// createGame()







