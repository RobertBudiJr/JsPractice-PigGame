//'use strict';

var scores, roundScore, activePlayer, gamePlaying;

init();

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = "<em>" + dice + "</em>";

//var x = document.querySelector('#score-0').textContent;
//console.log(x);

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (gamePlaying) {
    //1. Randomize Dice
    var dice = Math.floor(Math.random() * 6 + 1);

    //2. Display Result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3. Update Score Except 1
    if (dice !== 1) {
      //add score
      roundScore += dice;
      document.querySelector('#current--' + activePlayer).textContent =
        roundScore;
    } else {
      //switch player
      nextPlayer();
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (gamePlaying) {
    //Add current score to global
    scores[activePlayer] += roundScore;

    //Update UI
    document.querySelector('#score--' + activePlayer).textContent =
      scores[activePlayer];

    //Check Winner
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
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

  document.querySelector('.dice').style.display = 'none';
}

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

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
