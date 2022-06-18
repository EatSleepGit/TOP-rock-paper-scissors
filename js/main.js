console.log('Outside')


/* Create function for computer play;
Randomly create number between 0-2;
Assign Rock Paper or Scissors to each number; */

function computerPlay () {
    let randomNum  = Math.floor(Math.random() * 3);
    let computer = 
        randomNum === 0 ? 'Rock':
        randomNum === 1 ? 'Paper':
        'Scissors';

    console.log(randomNum);
    console.log(computer);
}

computerPlay();