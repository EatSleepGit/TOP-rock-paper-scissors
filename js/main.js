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
    
    let winner = 'Tie';
    let winnerChoice;
    let loserChoice;
    if (playerChoice === computerChoice) {
        return results = [winner, playerChoice, computerChoice];
        // return `It is a ${winner}, both with a ${computerChoice}`;
    } 
    else if (playerChoice === 'rock' && computerChoice === 'scissors'
        || playerChoice === 'scissors' && computerChoice === 'paper'
        || playerChoice === 'paper' && computerChoice === 'rock') {
            winner = 'Player';
            winnerChoice = playerChoice;
            loserChoice = computerChoice;
            return results = [winner, winnerChoice, loserChoice];
            // return winner = `The winner is the Player with ${playerChoice}
            // against ${computerChoice}`;
    } 
    else if (computerChoice === 'rock' && playerChoice === 'scissors'
    || computerChoice === 'scissors' && playerChoice === 'paper'
    || computerChoice === 'paper' && playerChoice === 'rock') {
        winner = 'Computer';
        winnerChoice = computerChoice;
        loserChoice = playerChoice;
        return results = [winner, winnerChoice, loserChoice];
        // return winner = `The winner is the Computer with ${computerChoice}
        // against ${playerChoice}`;
        
    }
}



/* Create main game function whictch calls playRound;
Create a loop that runs the game 5 times;
Keep score & return winner and loser at the end;
Get input from user using prompt(); */

function game () {
    let playerScore = 0;
    let computerScore = 0;
    let tie = 0;
    // let playerChoice = prompt('Pick Rock Paper or Scissors bitch!');
    

   for (let i = 0; i < 1; i++) {
    // let playerChoice = prompt('Pick Rock Paper or Scissors bitch!');
    let computerChoice = computerPlay();
    const [winner, winnerChoice, loserChoice] = playRound(playerChoice, computerChoice);

    winner === 'Player' ? playerScore++ :
    winner === 'Computer' ? computerScore++ : tie++;

    if (winner !== 'Tie') {
    console.log(`The winner is the ${winner} with ${winnerChoice} against ${loserChoice}`);
    }
    else {
        console.log(`It is a ${winner}, both with a ${winnerChoice}`);
    }

    // console.log(`Game nr ${i + 1} results: ${playRound(playerChoice, computerChoice)}`);
   }

//    console.log(`Results after 5 games: Player ${playerScore} against Computer ${computerScore} and ${tie} tied games.`)
}

game();
