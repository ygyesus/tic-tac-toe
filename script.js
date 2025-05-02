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
            return false;
        } 
        grid[row][col] = string;
        return string;
    }

    const viewGrid = ()=>{
        for (const row of grid){
            console.log(row);
        }
        console.log(" ");
    }

    const isGameOver = ()=>{
        console.log("checking if game is over....");
        viewGrid();



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
            return true;
        }
        if (grid[0][0] === 'X' && grid[1][1] === 'X' && grid[2][2] === 'X'){
            return true;
        }
        
        // check SW => NE diagonal
        if(grid[0][2] === 'O' && grid[1][1] === 'O' && grid[2][0] === 'O'){
            return true;
        }
        if(grid[0][2] === 'X' && grid[1][1] === 'X' && grid[2][0] === 'X'){            
            return true;
        }

        // console.log("Nope, not over yet!")
        return false;
    }

    const getGrid = ()=>grid;
    

    return {
        resetGrid, 
        makeMove, 
        viewGrid, 
        isGameOver,
        getGrid
    };

}




function createGame(gameBoard, playerOneName, playerTwoName){
    playerOneName = playerOneName === ""
        ? 'X' : playerOneName;
    
    playerTwoName = playerTwoName === ""
        ? 'O': playerTwoName;
    let playerOne = createPlayer(playerOneName, "X", gameBoard);
    let playerTwo = createPlayer(playerTwoName, "O", gameBoard);

    const players = [
        playerOne,
        playerTwo
    ];
    let count = 0;
    let activePlayer = players[0];
    const getActivePlayer = ()=>activePlayer;
    const switchTurn = ()=>{
        activePlayer = activePlayer === players[0]
            ?  players[1]
            : players[0];
    }

    const viewTurn = ()=>{
        console.log(`It's ${getActivePlayer().getName()}'s turn.`);
    };

    const playRound = (row,col)=>{
        let move = activePlayer.makeMove(row, col);
        if (move === false){
            return false;
        }
        count++;

        const outcome = judgeOutcome();
        if (outcome !== "keep going"){
            return outcome;
        }
        switchTurn();
        // gameBoard.viewGrid();
        return outcome;
        
    };
    const judgeOutcome = ()=>{
        if (gameBoard.isGameOver()) {
            // switchTurn();

            const winner = getActivePlayer().getName();
            switchTurn();
            const loozer = getActivePlayer().getName();
            const announcement = `Game Over! ${winner} wins! ${loozer} loses!`;
        
            // console.log(announcement);
            // alert(`Game Over! ${getActivePlayer().getName()} wins!`);
    
            // winner: O, loser: X. loser goes
            let loser;
    
            if (getActivePlayer() === players[0]){
                loser = players[1];
            } else if (getActivePlayer() === players[1]){
                loser = players[0];
            }
    
            // global.alert("GAME OVER")
            
            return announcement;
        
        } else if(count===9){
            const announcement = "It's a tie!"

            
            return announcement;
        } else {
            return "keep going";
        }
    
    };
    const resetCount = ()=>{
        count = 0;
    }

    return {
        playRound,
        judgeOutcome,
        viewTurn,
        getActivePlayer,
        resetCount
    };

}

function play(game, gameBoard){
    let flag = false;

    for (let i = 0; i<3; i++){
        if (flag === true){
            break;
        }
        for (let j = 0; j<3; j++){
            game.viewTurn();

            game.playRound(i,j);
            announcement = game.judgeOutcome();
            console.log(announcement);
            if (announcement != "keep going"){
                break;
            }
        }
    }
}



function createPlayer(name, string, gameBoard){
    let score = 0;

    function makeMove(row, col){
        return gameBoard.makeMove(row, col, string);
        
    }

    function getString(){
        return string;
    }

    function setString(move){
        string = move;
    }
    function getName(){
        return name;
    }
    function getScore(){
        return score;
    }
    function addScore(){
        score += 1;
    }

    return {
        getName, 
        getScore,
        makeMove,
        setString,
        addScore,
        getString
    };
}
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




function ScreenController(){
    const container = document.querySelector(".container");
    const gameBoard = createGameBoard();
    const displayStatus = document.querySelector(".display");
    const form = document.querySelector("form");
    const formButton = form.querySelector("button");
    const playerOneName = form.querySelector(".player-one").value;
    const playerTwoName = form.querySelector(".player-two").value;

    const newGameButton = document.querySelector(".new-game");
    newGameButton.addEventListener("click", ()=>{
        let screen = ScreenController();
        screen.updateScreen();
        const playerOneInput = document.querySelector("input");
        playerOneInput.focus();
    });

    const submitButton = document.querySelector(".submit");
    submitButton.addEventListener("click", ()=>{
        let screen = ScreenController();
        screen.updateScreen();
    })
    const game = createGame(gameBoard, playerOneName, playerTwoName);
    const activePlayer = game.getActivePlayer();

    console.log(displayStatus)
    displayStatus.classList.remove("display-status");
    displayStatus.classList.add("neutral");
    displayStatus.textContent = "";

    const pressKeyDown = (event, row, col)=>{
        const key = event.target.key;
        if (event.code === "ArrowDown"){
            const focusedCell = document.activeElement;
            if (row === 2){
                return;
            }
            let nextRow = Number(row)+1;
            
            // console.log(nextRow);
            // col = String(col);
            const buttons = document.querySelectorAll('[data-col]');
            for (const button of buttons){
                if (button.dataset.row === String(nextRow) && button.dataset.col === String(col)){
                    button.focus();
                    return;
                }
            }
            return;
        }

        if(event.code === "ArrowUp"){
            if (row===0){
                return;
            }

            let nextRow = Number(row)-1;
            const buttons = document.querySelectorAll('[data-col]');
            for (const button of buttons){
                if (button.dataset.row === String(nextRow) && button.dataset.col === String(col)){
                    button.focus();
                    return;
                }
            }
            return;
        }

        if (event.code === "ArrowLeft"){
            if (col===0){
                return;
            }

            let nextCol = Number(col)-1;
            const buttons = document.querySelectorAll('[data-col]');

            for (const button of buttons){
                if (button.dataset.row === String(row) && button.dataset.col === String(nextCol)){
                    button.focus();
                    return;
                }
            }
            return;
        }

        if (event.code === "ArrowRight"){
            if (col===2){
                return;
            }

            let nextCol = Number(col)+1;
            const buttons = document.querySelectorAll('[data-col]');

            for (const button of buttons){
                if (button.dataset.row === String(row) && button.dataset.col === String(nextCol)){
                    button.focus();
                    return;
                }
            }
            return;
        }
        // const nextButton = document.querySelector('[data-row=`${nextRow}`][data-col="2"]');
        // nextButton.focus();
    };

    
    
    

    // play(game, gameBoard);

    function updateScreen(){
        while(container.hasChildNodes()){
            container.removeChild(container.firstChild);
        }
        let canClick = true;
        const grid = gameBoard.getGrid();
        for (const row in grid){
            for (const col in grid[row]){
                const button = document.createElement("button");
                // button.textContent = grid[row][col];
                container.appendChild(button);
                button.dataset.row = String(row);
                button.dataset.col = String(col);
                // console.log(button.dataset.row);
                button.addEventListener("keydown", (event)=>{
                    pressKeyDown(event, row, col);
                });
                button.addEventListener("click", (event)=>{
                    if (!canClick){
                        return;
                    }
                    const string = game.getActivePlayer().getString();
                    const outcome = game.playRound(row, col);
                    if(outcome === false){
                        return;
                    }
                    button.textContent = string;
                    if(string === "X"){
                        button.style.backgroundColor = "red";
                    } else if (string === "O"){
                        button.style.backgroundColor = "goldenrod";
                    }

                    if (outcome !== "keep going"){
                        canClick = false;
                        // alert(outcome);
                        console.log(outcome);
                        displayStatus.textContent = outcome;
                        displayStatus.classList.add("display-status");
                        displayStatus.classList.remove("neutral");
                    }

                    // updateScreen();
                })
            }

        }
    
    }
    updateScreen();


    return {
        updateScreen
    };
}

let screen = ScreenController();





