const ticTacToe = () =>{
    const container = document.querySelector('.container');
    const gameBox = document.querySelector('.game-box');
    const chooseGameMode = document.querySelector('.buttons')
    const textHeader = document.querySelector('.text-header');
    const multiScore = document.querySelector('.score-board');
    let numberOfGames = document.createElement('span');
    let playerOnesTurn = false;
    let clicks = 0;

    let playerOneScore = document.createElement('span');
    let playerTwoScore = document.createElement('span');
    let tieScore = document.createElement('span');


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
        //renderGame();
        textHeader.innerText = "Single Player is still under construction."
        textHeader.style.color = "aliceblue"
    
        while(multiScore.hasChildNodes()){
            multiScore.removeChild(multiScore.firstChild);
        }
    }
    
    const multiPlayer = () =>{
        scoreBoard();
        renderGameMultiplayer();
        numberOfGames.innerText = 1;
    }
    
    const scoreBoard = () =>{
        container.appendChild(multiScore);
        multiScore.style.width = "450px";
        const playerOneScoreLabel = document.createElement('div');
        multiScore.appendChild(playerOneScoreLabel);
        const playerTwoScoreLabel = document.createElement('div');
        multiScore.appendChild(playerTwoScoreLabel);
        const tieScoreLabel = document.createElement('div');
        multiScore.appendChild(tieScoreLabel);
    
        //Scoring style
        multiScore.style.fontSize = "21px"
        multiScore.style.display = "flex"
        multiScore.style.flexDirection = "column"
        multiScore.style.rowGap = "10px"
    
        playerOneScoreLabel.innerText = "Player1 Score: "
        playerTwoScoreLabel.innerText = "Player2 Score: "
        tieScoreLabel.innerText = "Ties: "
    
        playerOneScoreLabel.appendChild(playerOneScore)
    
        //playerOneScore.innerText = 0;
    
        playerTwoScoreLabel.appendChild(playerTwoScore)
    
        //playerTwoScore.innerText = 0;
    
        tieScoreLabel.appendChild(tieScore)
    
        //tieScore.innerText = 0;
    }
    
    const renderGameMultiplayer = () =>{
        textHeader.style.color = "aliceblue"
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
            console.log(clicks,numberOfGames.innerText)
        })
        if(clicks === 9){
            resetGame();
            textHeader.style.color = "aliceblue"
            textHeader.innerText = "Tie Game! Press Enter to Continue."
        }else{
            let {xWins,oWins} = gameChecker();
            if (xWins){
                thereIsWinner = true;
                textHeader.style.color = "blue"
                textHeader.innerText = "Player 1 Wins! Press this to Continue."
                textHeader.style.cursor = "pointer";
                textHeader.addEventListener('click', e =>{
                    if (e.target){
                        console.log("pumapasok?")
                        resetGame();
                    }
                })
            }else if (oWins){
                thereIsWinner = true;
                textHeader.style.color = "red"
                textHeader.innerText = "Player 2 Wins! Press this to Continue."
            }
        }

    
    }

    const resetGame = () => {
        console.log("game is reset")        
        numberOfGames.innerText = parseInt(numberOfGames.innerText) + 1;
        clicks = 0;

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
