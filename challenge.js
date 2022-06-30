//'use strict';

var scores, roundScore, activePlayer, gamePlaying;

init();

// var lastDice;

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (gamePlaying) {
    //1. Randomize Dice
    var dice0 = Math.floor(Math.random() * 6 + 1);
    var dice1 = Math.floor(Math.random() * 6 + 1);

    //2. Display Result
    document.getElementById('dice-0').style.display = 'block';
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-0').src = 'dice-' + dice0 + '.png';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';

    //3. Update Score Except 1 && Loss all score if got 6 twice in a turn
    // if (dice === 6 && lastDice === 6) {
    //   scores[activePlayer] = 0;
    //   document.querySelector('#score--' + activePlayer).textContent = '0';
    //   nextPlayer();
    // } else
    if (dice0 !== 1 && dice1 !== 1) {
      //add score
      roundScore += dice0 + dice1;
      document.querySelector('#current--' + activePlayer).textContent =
        roundScore;
    } else {
      //switch player
      nextPlayer();
    }

    // lastDice = dice;
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (gamePlaying) {
    //Add current score to global
    scores[activePlayer] += roundScore;

    //Update UI
    document.querySelector('#score--' + activePlayer).textContent =
      scores[activePlayer];

    //Input max Score
    var input = document.querySelector('.final-score').value;

    //Undefined, null, 0, or "" are coerced to false
    //anything else is coerced true
    if (input) {
      var winningScore = input;
    } else {
      winningScore = 100;
    }

    //Check Winner
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
      document.getElementById('dice-0').style.display = 'none';
      document.getElementById('dice-1').style.display = 'none';
      document
        .querySelector('.player--' + activePlayer)
        .classList.add('player--winner');
      document
        .querySelector('.player--' + activePlayer)
        .classList.remove('player--active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';

  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');

  document.getElementById('dice-0').style.display = 'none';
  document.getElementById('dice-1').style.display = 'none';
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById('dice-0').style.display = 'none';
  document.getElementById('dice-1').style.display = 'none';

  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;

  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';

  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
}

document.querySelector('.btn--new').addEventListener('click', init);
