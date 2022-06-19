/* Create function for computer play;
Randomly create number between 0-2;
Assign Rock Paper or Scissors to each number; */

function computerPlay () {
    let randomNum  = Math.floor(Math.random() * 3);
    let computer = 
        randomNum === 0 ? 'rock':
        randomNum === 1 ? 'paper':
        'scissors';

    return computer;
}

/* Function plays single round of the game;
Takes computers choice & players choice and return a 
winnner; */

function playRound(playerChoice, computerChoice) {
    computerChoice = computerChoice.toLowerCase();
    console.log(computerChoice);
    
    let winner = 'Tie';
    if (playerChoice === computerChoice) {
        return `It is a ${winner}, both with a ${computerChoice}`;
    } 
    else if (playerChoice === 'rock' && computerChoice === 'scissors'
        || playerChoice === 'scissors' && computerChoice === 'paper'
        || playerChoice === 'paper' && computerChoice === 'rock') {
        return winner = `The winner is the Player with ${playerChoice}
        against ${computerChoice}`;
    } 
    else if (computerChoice === 'rock' && playerChoice === 'scissors'
    || computerChoice === 'scissors' && playerChoice === 'paper'
    || computerChoice === 'paper' && playerChoice === 'rock') {
    return winner = `The winner is the Computer with ${computerChoice}
    against ${playerChoice}`;
        
    }
}

const playerChoice = 'scissors';
const computerChoice = computerPlay();
console.log(playRound(playerChoice, computerChoice));