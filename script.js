'use strict';
//Element Selection
const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');

const currentScoreEL1 = document.getElementById('current--0');
const currentScoreEL2 = document.getElementById('current--1');

const scoreEL0 = document.getElementById('score--0');
const scoreEL1 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');

//Starting Condition
//GeneralFunction

let score, currentScore, activePlayer, playing;
const initiallizaton = function () {

    scoreEL1.textContent = 0;
    scoreEL0.textContent = 0;
    dice.classList.add('hidden');
    currentScoreEL1.textContent = 0;
    currentScoreEL2.textContent = 0;
    btnHold.classList.remove('hidden');
    btnRoll.classList.remove('hidden');
    player1.classList.remove('player--winner');
    player2.classList.remove('player--winner');
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

}

initiallizaton();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
}

//Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        //Generate random diceRoll
        let DiceNumber = Math.trunc(Math.random() * 6) + 1;
        console.log(DiceNumber);

        //Display Dice based on random number
        dice.classList.remove('hidden');
        dice.src = `dice-${DiceNumber}.png`;

        // condition check 1

        if (DiceNumber !== 1) {
            currentScore += DiceNumber;
            console.log(`Currentscr:${currentScore}`);

            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            switchPlayer();
        }
    }
});

//Hold functionality

btnHold.addEventListener('click', function () {
    if (playing) {
        // add current score to globle score

        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
        // check globle score >=100

        if (score[activePlayer] >= 20) {
            playing = false;
            dice.classList.add('hidden');
            btnHold.classList.add('hidden');
            btnRoll.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }

    }

});

btnNew.addEventListener('click', initiallizaton);
