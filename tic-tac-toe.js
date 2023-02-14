const gameMode = () =>{
    const chooseGameMode = document.querySelector('.buttons')
    chooseGameMode.addEventListener('click',(e)=>{
        e.target.style.backgroundColor = "aliceblue";
        e.target.style.color = "rgb(20,20,20)";

        if(e.target === document.getElementById('single-player')){
            singlePlayer();
        }
        if(e.target === document.getElementById('multi-player')){
            multiPlayer();
        }

    })
}

const singlePlayer = () => {
    console.log("single player")
    //make AI
    renderGame();
}

const multiPlayer = () =>{
    scoreBoard();
    renderGameMultiplayer();
}

const scoreBoard = () =>{
    const container = document.querySelector('.container');
    const multiScore = document.createElement('section');
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

    let playerOneScore = document.createElement('span');
    playerOneScoreLabel.appendChild(playerOneScore)

    playerOneScore.innerText = 0;

    let playerTwoScore = document.createElement('span');
    playerTwoScoreLabel.appendChild(playerTwoScore)

    playerTwoScore.innerText = 0;

    let tieScore = document.createElement('span');
    tieScoreLabel.appendChild(tieScore)

    tieScore.innerText = 0;
}

const renderGameMultiplayer = () =>{
    //if player 1 clicked, print x. if player 2, print o.
    const gameBox = document.querySelector('.game-box');
    gameBox.addEventListener("click", (e)=>{
        if(e.target.innerText === "X" || e.target.innerText === "O"){
            e.preventDefault();
        }
        else{
            e.target.style.color = "blue"
            e.target.style.fontSize = "40px"
            e.target.innerText = "X"
        }
        
    })
    return gameBox;
}

gameMode();
