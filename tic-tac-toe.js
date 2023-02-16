const ticTacToe = () =>{
    const gameBox = document.querySelector('.game-box');
    const chooseGameMode = document.querySelector('.buttons')
    const textHeader = document.querySelector('.text-header');

    let numberOfGames = document.createElement('span');
    let playerOnesTurn = false;
    let clicks = 0;

    let p1Score = document.getElementById('player1-score');
    let p2Score = document.getElementById('player2-score');
    let ties = document.getElementById('tie-score');

    let p1Name = document.getElementById('player1-name');
    let p2Name = document.getElementById('player2-name');


    const gameMode = () =>{
        chooseGameMode.addEventListener('click',(e)=>{
            if(e.target === document.getElementById('single-player')){
                if (parseInt(numberOfGames.innerText)  >= 1){
                    e.preventDefault();
                }
                else{
                    singlePlayer();        
                    document.getElementById('single-player').classList.remove('hover');
                }
            }else if(e.target === document.getElementById('multi-player')){
                if (parseInt(numberOfGames.innerText)  >= 1){
                    e.preventDefault();
                }
                else{
                    multiPlayer(); 
                    document.getElementById('single-player').classList.remove('hover');
                    document.getElementById('multi-player').classList.remove('hover');
                }
            }else{
                e.preventDefault();
            }
        })
        return chooseGameMode
    }
    
    const singlePlayer = () => {
        console.log("single player")
    
        //make AI
        textHeader.innerText = "Single Player is still under construction."
        textHeader.style.color = "aliceblue"    
    }
    
    const multiPlayer = () =>{
        renderGameMultiplayer();
        numberOfGames.innerText = 1;
    }
    
    const renderGameMultiplayer = () =>{
        textHeader.style.color = "aliceblue"
        p1Score.innerText = 0;
        p2Score.innerText = 0;
        ties.innerText = 0;
        p1Name.innerText = prompt('Please Enter Player 1 Name: ') + ' Score: '
        p2Name.innerText = prompt('Please Enter Player 2 Name: ') + ' Score: '
        textHeader.innerText ="Multiplayer Mode. Player 1's Turn" //default text
        let thereIsWinner = false;
        gameBox.addEventListener("click", (e)=>{
            if(e.target.innerText === "X" || e.target.innerText === "O"){
                e.preventDefault();
            }else if (thereIsWinner){
                e.preventDefault();
                console.log("no way")
            }
            else{
                if (parseInt(numberOfGames.innerText) % 2 != 0){
                    playerOnesTurn = true;
                }else{
                    playerOnesTurn = false;
                } 
                if(playerOnesTurn === true){
                    if(clicks % 2 === 0){
                        e.target.style.color = "blue"
                        e.target.style.fontSize = "40px"
                        e.target.innerText = "X"        
                        textHeader.innerText ="Player 2's Turn"
                    }else{
                        e.target.style.color = "red"
                        e.target.style.fontSize = "40px"
                        e.target.innerText = "O"                                
                        textHeader.innerText ="Player 1's Turn"
                    }
                }else{
                    if(clicks % 2 === 0){
                        e.target.style.color = "red"
                        e.target.style.fontSize = "40px"
                        e.target.innerText = "O"                                
                        textHeader.innerText ="Player 1's Turn"
                    }else{
                        e.target.style.color = "blue"
                        e.target.style.fontSize = "40px"
                        e.target.innerText = "X"        
                        textHeader.innerText ="Player 2's Turn"
                    }
                }
                clicks++;
            }
            if(thereIsWinner){
                e.preventDefault();
            }else{
                if(clicks === 9){
                    thereIsWinner = true;
                    textHeader.style.color = "aliceblue"
                    textHeader.innerText = "Tie Game! Click here to Continue."
                    textHeader.style.cursor = "pointer";
                    ties.innerText = parseInt(ties.innerText) +1;
                }else{
                    let {xWins,oWins} = gameChecker();
                    if (xWins){
                        thereIsWinner = true;
                        textHeader.style.color = "blue"
                        textHeader.innerText = "Player 1 Wins! Click here to Continue."
                        textHeader.style.cursor = "pointer";
                        p1Score.innerText = parseInt(p1Score.innerText) + 1;
                    }else if (oWins){
                        thereIsWinner = true;
                        textHeader.style.color = "red"
                        textHeader.innerText = "Player 2 Wins! Click here to Continue."
                        textHeader.style.cursor = "pointer";
                        p2Score.innerText = parseInt(p2Score.innerText) + 1;
                    }
                }
                textHeader.addEventListener('click', e =>{
                    if (!thereIsWinner){
                        e.preventDefault();
                    }else if (e.target){
                        resetGame();
                        thereIsWinner = false;
                        textHeader.style.cursor = "default";
                    }
                    if (playerOnesTurn){
                        textHeader.innerText ="Multiplayer Mode. Player 2's turn"
                    }else{
                        textHeader.innerText ="Multiplayer Mode. Player 1's Turn"
                    }
                });
            }
        })
    
    }

    const resetGame = () => {
        console.log("game is reset")        
        numberOfGames.innerText = parseInt(numberOfGames.innerText) + 1;
        clicks = 0;
        textHeader.style.color = 'aliceblue'

        for (let i=0; i<gameBox.children.length; i++){
            gameBox.children[i].innerText = "";
        }
    }
    
    const gameChecker = () =>{
        let xWins = false;
        let oWins = false;
        if (gameBox.children[0].innerText === 'X' && gameBox.children[1].innerText === 'X' &&  gameBox.children[2].innerText === 'X'){
            xWins = true;
        }else if (gameBox.children[0].innerText === 'O' && gameBox.children[1].innerText === 'O' &&  gameBox.children[2].innerText === 'O'){
            oWins = true;
        }
        if (gameBox.children[0].innerText === 'X' && gameBox.children[3].innerText === 'X' &&  gameBox.children[6].innerText === 'X'){
            xWins = true;
        }else if (gameBox.children[0].innerText === 'O' && gameBox.children[3].innerText === 'O' &&  gameBox.children[6].innerText === 'O'){
            oWins = true;
        }
        if (gameBox.children[1].innerText === 'X' && gameBox.children[4].innerText === 'X' &&  gameBox.children[7].innerText === 'X'){
            xWins = true;
        }else if (gameBox.children[1].innerText === 'O' && gameBox.children[4].innerText === 'O' &&  gameBox.children[7].innerText === 'O'){
            oWins = true;
        }
        if (gameBox.children[2].innerText === 'X' && gameBox.children[5].innerText === 'X' &&  gameBox.children[8].innerText === 'X'){
            xWins = true;
        }else if (gameBox.children[2].innerText === 'O' && gameBox.children[5].innerText === 'O' &&  gameBox.children[8].innerText === 'O'){
            oWins = true;
        }
        if (gameBox.children[3].innerText === 'X' && gameBox.children[4].innerText === 'X' &&  gameBox.children[5].innerText === 'X'){
            xWins = true;
        }else if (gameBox.children[3].innerText === 'O' && gameBox.children[4].innerText === 'O' &&  gameBox.children[5].innerText === 'O'){
            oWins = true;
        }
        if (gameBox.children[6].innerText === 'X' && gameBox.children[7].innerText === 'X' &&  gameBox.children[8].innerText === 'X'){
            xWins = true;
        }else if (gameBox.children[6].innerText === 'O' && gameBox.children[7].innerText === 'O' &&  gameBox.children[8].innerText === 'O'){
            oWins = true;
        }
        if (gameBox.children[0].innerText === 'X' && gameBox.children[4].innerText === 'X' &&  gameBox.children[8].innerText === 'X'){
            xWins = true;
        }else if (gameBox.children[0].innerText === 'O' && gameBox.children[4].innerText === 'O' &&  gameBox.children[8].innerText === 'O'){
            oWins = true;
        }
        if (gameBox.children[2].innerText === 'X' && gameBox.children[4].innerText === 'X' &&  gameBox.children[6].innerText === 'X'){
            xWins = true;
        }else if (gameBox.children[2].innerText === 'O' && gameBox.children[4].innerText === 'O' &&  gameBox.children[6].innerText === 'O'){
            oWins = true;
        }
        return {xWins,oWins}
    }

    gameMode();
}


ticTacToe();
