/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
Additional Challenges:
1. If a player roll 2 times 6 in a row then his global score will be zero.
2. Player can input the winning score
3. Two dices will be rolled simultaneously if any one of them rolls 1 then round over current score 0.
*/


var score, roundScore, active,gamePlaying,lastDice;


init();

var diceDOM = document.querySelector('.dice');
var dice2DOM  = document.querySelector('.dice_two');
diceDOM.style.display = 'none';
dice2DOM.style.display = 'none';
//Select elements using ids


document.querySelector('.btn-roll').addEventListener('click', function()
{   if(gamePlaying)
    {
    //1.Generate Number
    var dice2 = Math.floor(Math.random()*6)+1;     
    var dice = Math.floor(Math.random()*6)+1;
    //2.Display Dice
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    var dice2DOM = document.querySelector('.dice_two');
    dice2DOM.style.display = 'block';
    dice2DOM.src = 'dice-' + dice2 + '.png';   
    //3.Make Changes In Score 
    if(dice == 6 && lastDice == 6){
        document.getElementById('score-'+activePlayer).textContent = '0';
        document.getElementById('current-'+activePlayer).textContent = '0';
        score[activePlayer] = 0;
        roundScore = 0;
        nextPlayer();
    } else if(dice !== 1 && dice2 !== 1){
        roundScore += dice+dice2;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    }
    else{
     nextPlayer();
    }
    lastDice = dice;
    }
    })

document.querySelector('.btn-hold').addEventListener('click', function()
{
    if(gamePlaying){
            //Add roundScore to global Score
    score[activePlayer] += roundScore;
    //update the ui
    document.getElementById('score-'+activePlayer).textContent = score[activePlayer];
    
    var input = document.querySelector('.final_score').value;
    var winningScore;    
    if(input){
        winningScore = input;
    }  else{
        winningScore = 100;
    }
    //Check if player is winner
    if(score[activePlayer] >= winningScore){
    document.getElementById('name-'+activePlayer).innerHTML = '<strong>Winner!</strong>';    
    diceDOM.style.display = 'none';
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
    document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
    gamePlaying = false;
    }
    else{
    //Change Player
    nextPlayer();
    }
    }
    
});

function nextPlayer(){
    lastDice = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    diceDOM.style.display = 'none';
    dice2DOM.style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    score=[0,0];
    activePlayer=0;
    roundScore=0;
    lastDice = 0;
    gamePlaying = true;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.getElementById('name-0').innerHTML = 'Player 1'; 
    document.getElementById('name-1').innerHTML = 'Player 2'; 
}









