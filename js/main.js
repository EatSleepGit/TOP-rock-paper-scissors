/**
 * @author Kim Arontaus
 * @version 0.0.1
 * ...
 */


// Player & Computer Objects to keep their data
const player = {
  avatar: `img src=images/player_avatar.png`,
  weapon: 'unDecided',
  name: 'Player One',
  cash: 300,
  won: 0,
  lost: 0,
  tied: 0,
  played: 0,
  score: 0,
  lives: 5,
  wantsToPlay: false,
  gameOver: false,
  wonLast: false,
  lastWeapon: '',
};

const computer = {
    avatar: `img src=images/computer_avatar.png`,
    name: 'Puter Boy',
    cash: 300,
    won: 0,
    lost: 0,
    tied: 0,
    played: 0,
    score: 0,
    lives: 5,
    wonLast: false,
    lastWeapon: '',
    weapon: 'dick in my hands'
};

// Main Game Object to keep game data
const gameResults = {
    round: 0,
    winner: {},
    loser: {},
    tie: false,
    winningWeapon: 'waiting1',
    losingWeapon: 'waiting2',
    cashWon: 0
};

 // Event Listneners for Play/Play again and Player Weapons buttons
 function addClickListeners() {
    // Click Listneners for Action (play) button
    const actionButton = document.querySelector('.action_button');
    actionButton.addEventListener('click', playHandler);

    // Click Listeners for player weapons
    document.querySelector('.player_weapons').childNodes.forEach(item => {
        item.addEventListener('click', event => {
        if (player.wantsToPlay) { 
            handleWeapons(item);
        }
        })
      })
    document.querySelector('.restart_button').addEventListener('click', event => {
        window.location.reload(false); // true or false???
    })
}

// Event Handler for Play/Play Again Button
function playHandler(event) {
    if (event.target.innerHTML === 'Play Again') {
        reset();
    }

    if (event.target.className === 'action_button') {
        playSound('unsheath_sword');
        toggleGraphics('.action_button', 'action_button_pressed');
        event.target.classList.add('transition');
        setTimeout(() => {
            player.wantsToPlay = true;

            // Activates Player Weapon Buttons
            playerWeaponsAppearance(true);
            setTimeout(() => {
                addToStyle('.game_console_center_mid', 'visibility', 'visible');
                addToStyle('.game_console_center_bottom', 'visibility', 'visible');
            }, 1500);
            event.target.classList.remove('transition');  
        }, 700)
    } 
 } 

/**
 * Assign the Computer a weapon. Randomly create numbers between 0-2.
 * Assign Rock, Paper or Scissors to respective number and return weapon.
 */
function computerPlay () {
    let randomNum  = Math.floor(Math.random() * 3);
    let computer = 
        randomNum === 0 ? 'rock':
        randomNum === 1 ? 'paper':
        'scissors';
    console.log(`Random weapon called: ${computer} & nr:${randomNum}`);
    return computer;
}

/**
 * Where The Magic Happens
 * Through an overly long & ugly code we
 * decide who's the winner & Update the Game data Object
 */
 function playRound(player, computer) {
    let computerChoice = computerPlay();
    computer.weapon = computerChoice;
    let playerChoice = player.weapon;
    computerChoice = computerChoice.toLowerCase();
    
    if (playerChoice === computerChoice) {
        gameResults.tie = true;
        gameResults.winningWeapon = playerChoice;
        gameResults.losingWeapon = computerChoice;
    } 
    else if (playerChoice === 'rock' && computerChoice === 'scissors'
        || playerChoice === 'scissors' && computerChoice === 'paper'
        || playerChoice === 'paper' && computerChoice === 'rock') {
            gameResults['winner'] = 'Player';
            gameResults['loser'] = 'Computer';
            gameResults.winningWeapon = playerChoice;
            gameResults.losingWeapon = computerChoice;
    } 
    else if (computerChoice === 'rock' && playerChoice === 'scissors'
    || computerChoice === 'scissors' && playerChoice === 'paper'
    || computerChoice === 'paper' && playerChoice === 'rock') {
        gameResults['winner'] = 'Computer';
        gameResults['loser'] = 'Player';
        gameResults.winningWeapon = computerChoice;
        gameResults.losingWeapon = playerChoice;
    }
    updateStats(gameResults.winner);
}

// Call playRound, then Update Graphics based on who won. END Game round!
function gamePlay(player, computer) {
    if (player.wantsToPlay && player.weapon !== 'unDecided') {

        // Option to run a specific amount of games in a row
        for (let i = 0; i < 1; i++) {

            // Calling to get the actual results
            playRound(player, computer);
            if (!gameResults.tie) {
                console.log(`8: The winner is the ${gameResults.winner} with ${gameResults.winningWeapon} against ${gameResults.losingWeapon}`);
                updateGraphics('.players_choice', player.weapon, false, 500);
                updateGraphics('.computers_choice', computer.weapon, false, 100);
            }
            else if (gameResults.tie){
                console.log(`9: It is a Tie! both with a ${gameResults.winningWeapon}`);
                updateGraphics('.players_choice', gameResults.winningWeapon);
                updateGraphics('.computers_choice', gameResults.winningWeapon);
            }
            gameOver(true); 
        }
    } else {

        /**
         * Wait & Calling itself again in case we get here too early!
         * Ugly solution for the problem
         */
        setTimeout(() => {
            // console.log('7: Inside gamePlay() TimeOut');
            gamePlay(player, computer);
        }, 1000); 
    }
}


 // Activate & De-Activate Player Weapon Button graphics and sounds
function playerWeaponsAppearance(status) {

    if (!status) {
        Array.from(document.querySelector('.player_weapons').children).forEach((child, i) => {
            setTimeout(() => {
                child.style.background = 'var(--console-background)';
            },i * 400);
          })
    } else if(status) {
        Array.from(document.querySelector('.player_weapons').children).forEach((child, i) => {  
            setTimeout(() => {
                playSound('shutter');
                child.style.background = 'var(--main-page-color)';                   
            },i * 500);
        })
    }
 }

// Assign the Player a weapon based on what button he clicked earlier
function handleWeapons(item) {
    let player_weapon;
    // Doing this instead of hardcoding the wepons in HTML incase we're adding/changing weapons
    switch (item.className) {
        case 'weapon1':
            player_weapon = 'rock';
            break;
        case 'weapon2':
            player_weapon = 'paper';
            break;
        case 'weapon3':
            player_weapon = 'scissors';
            break;
        default:
            'The fuck is going on!??'    
    }

    // Add the weapon to the player Object
    player.weapon = player_weapon;

    // Call and Update Combatant Stats
    addToGUI();
}

function playSound(sound) {
    const audio = document.getElementById(sound);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  }

// Toggle Classes ON & OFF
function toggleGraphics(tagName, cssName) {
    document.querySelector(tagName).classList.toggle(cssName);
}

 // Reusable function to Add / Change CSS styles
function addToStyle(target, styleType, text, optional=null) {
    // console.log(`addToStyle ${optional}`);
    document.querySelector(target).style.setProperty(styleType, text, optional);
}

 // Update Results / Winner info, Stats & Graphics
function getResults() {

    let winnerName = '.winner_name';
    let winnerName2 = '.winner_name2';
    const gccmElement = document.querySelector('.game_console_center_mid');
    const gccbElement = document.querySelector('.game_console_center_bottom');
    playSound('sword');
    addTextToTarget('game_nr', `${gameResults.round}`)

    if (gameResults.tie) {
        addTextToTarget(winnerName, `It's a tie!`);
        addTextToTarget(winnerName2, `Idiot against Idiot:`);
        gameResults.losingWeapon = gameResults.winningWeapon;
    } else {
        addTextToTarget(winnerName, `${gameResults.winner} is the winner!`);
        addTextToTarget(winnerName2, `${gameResults.winner} won ${gameResults.cashWon}`);
    }
    resultGraphics(false);
    addTextToTarget('winning_weapon', `with ${gameResults.winningWeapon}`)
    addTextToTarget('losing_weapon', `against ${gameResults.losingWeapon}`)

    // Timeout for dramatic delay
    setTimeout(() => {
        addToStyle('.winner_container', 'content-visibility', 'visible');
    }, 650)
    
    // Result Color "Effects" & Animated Transitions
    toggleGraphics('.game_console_center_mid', 'game_console_center_mid_active');
    gccmElement.classList.add('transition');

    setTimeout(() => {
        toggleGraphics('.game_console_center_bottom', 'game_console_center_bottom_active');
        gccbElement.classList.add('transition');
    }, 450);

    setTimeout(() => {
        gccmElement.classList.remove('transition');
        gccbElement.classList.remove('transition');
    }, 500);
}

function resultGraphics(clean) {
    updateGraphics('.winner_weapon', gameResults.winningWeapon, clean);        
    updateGraphics('.loser_weapon', gameResults.losingWeapon, clean);
    if (!gameResults.tie) {

        // FIX! gameResults.winner.toLowerCase() throws an error rarely!?
        updateGraphics('.winner_avatar', gameResults.winner.toLowerCase(), clean);
    }      
}

// Reusable function to add / remove images
function updateGraphics(target, param1, clean=false, wait=0) {
    /**
     * target = 'class_name' - param1 = image_name
     * clean = Clean ONLY
     */
    setTimeout(() => {
        const dv = document.querySelector(target);
    
        // Remove all child nodes
        while (dv.hasChildNodes()) {
        dv.removeChild(dv.lastChild);
        }

        // Used for cleaning up only
        if (clean) { return }
    
        var img = document.createElement('IMG');
        img.src = `images/${param1}_120.png`;
        dv.appendChild(img);
    }, wait);
}

 // Send Info to Update Combatant Stats
 function addToGUI() {
    addTextToTarget('.player_games_won', `Games won: ${player.won}`);
    addTextToTarget('.player_games_lost', `Games lost: ${player.lost}`);
    addTextToTarget('.player_games_tied', `Games tied: ${player.tied}`);
    addTextToTarget('.player_games_played', `Games played: ${player.played}`);
   
    addTextToTarget('.computer_games_won', `Games won: ${computer.won}`);
    addTextToTarget('.computer_games_lost', `Games lost: ${computer.lost}`);
    addTextToTarget('.computer_games_tied', `Games tied: ${computer.tied}`);
    addTextToTarget('.computer_games_played', `Games played: ${computer.played}`);
}

 // Update Combatant Stats
function addTextToTarget(target, text) {
    if(target[0] !== '.') {
        document.getElementById(target).innerHTML = text;
    } else {
        document.querySelector(target).innerHTML = text;
    }
}

function updateStats(winner) {
    if (gameResults.tie) {
        player.tied += 1;
        computer.tied += 1;
    }
   if ( winner === 'Player') {
    player.won += 1;
    computer.lost += 1;
   } else if (winner === 'Computer'){
    computer.won += 1;
    player.lost += 1;
   }
    player.played += 1;
    computer.played += 1;
    addToGUI();
}

// Intro Animation Screen. Calling the right things at the right time. Hopefully!
function intro() {
    setTimeout(() => {
        if (document.querySelector('.intro_container')) {
        document.querySelector('.intro_container').remove();
        }
        textBox();
        setTimeout(() => {
            header();
        }, 5500);
        setTimeout(() => {
            mainContainer()
        }, 6000);
        setTimeout(() => {
            footer();
        }, 5500);
        document.removeEventListener('keydown', exitIntro);
    }, 21000);
    document.addEventListener('keydown', exitIntro);
}

// In case we want to abort the Intro Screen
function exitIntro(event) {
    document.querySelector('.intro_container').remove();
    textBox();
    header();
    mainContainer()
    footer();
    document.removeEventListener('keydown', exitIntro);
}

// Handle the "Would you like to play a game..." message
function textBox() {
    addToStyle('.game_text_box', 'visibility', 'visible');
    addToStyle('.type', 'animation-play-state', 'running', 'important');
    addToStyle('.game_text_box', 'animation-play-state', 'running');

    setTimeout(() => {
        addToStyle('.game_text_box', 'border-color', 'var(--main-console-color)');
    }, 5000);
}

function header() {
    addToStyle('.header', 'visibility', 'visible');
}

function mainContainer() {
    addToStyle('.main_container', 'visibility', 'visible');
}

function footer() {
    addToStyle('.footer_content', 'visibility', 'visible');
}

/**
 * If the Game is over, start END of game processes
 * Start resetting and prepating for next round
 */
 function gameOver(isOver) {
    if (!isOver) { 
        return false
    } else {
        player.wantsToPlay = false;

        // Toggle OFF active Play button & active weapons
        toggleGraphics('.action_button', 'action_button_pressed');
        playerWeaponsAppearance(false);
        gameResults.round += 1;
        getResults();

        // Choose sound to play based on winning combatant & if game Tied
        if (gameResults.winner === 'Player') {
            playSound('yipee');
        } else if (gameResults.tie) {
            if (gameResults.winningWeapon === 'rock') { playSound('rock'); }
            if (gameResults.winningWeapon === 'paper') { playSound('paper'); }
            if (gameResults.winningWeapon === 'scissors') { playSound('scissors'); }
        }
            else {
            playSound('negative_beeps');
        }
        toggleGraphics('.action_button', 'action_button_pulsating');
        addTextToTarget('.action_button', 'Play Again');
        addToStyle('.restart_button', 'visibility', 'visible');
        return isOver;
    }
}

/**
 * RESET after a round is finished
 * Hide or Toggle classes & Images and Reset Game Object Data
 */
function reset() {
   
    toggleGraphics('.action_button', 'action_button_pulsating');
    addTextToTarget('.action_button', 'Play Again');

    document.querySelector('.player_weapons').childNodes.forEach(item => {
        item.removeEventListener('click', event => {
        })
    })
    
    // chosenWeaponImages('question', 'question');
    updateGraphics('.players_choice', 'question');
    updateGraphics('.computers_choice', 'question');

    // True send a message to ONLY clean up graphics, not to replace
    resultGraphics(true);

    toggleGraphics('.game_console_center_mid', 'game_console_center_mid_active');
    toggleGraphics('.game_console_center_bottom', 'game_console_center_bottom_active');

    addToStyle('.game_console_center_mid', 'visibility', 'hidden');
    addToStyle('.game_console_center_bottom', 'visibility', 'hidden');

    playSound('reset2');

    addTextToTarget('.winner_name', '');
    addTextToTarget('.winner_name2', '');

    addTextToTarget('winning_weapon', '');
    addTextToTarget('losing_weapon', '');

    player.lastWeapon = player.weapon;
    player.weapon = 'unDecided';
    computer.weapon = 'new';
    gameResults.tie = false;
    gameResults. winner = {};
    gameResults. loser = {};
    gameResults.winningWeapon = 'waiting1';
    gameResults.losingWeapon = 'waiting2';
    // cashWon: 0

    // Start another round of Game (Play again)
    gameLoop(); 
}

// Where it all began
function gameLoop () { 
    addToGUI();
    gameOver(false);
    addClickListeners();
    gamePlay(player, computer);    
}

intro();
gameLoop();




