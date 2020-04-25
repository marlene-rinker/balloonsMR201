/* eslint-disable no-trailing-spaces */
'use strict';

// create userArray to store all user objects
User.userArray = [];
if (localStorage.getItem('resultsInLocalStorage')){
  getUsersFromLocalStorage();
}

function getUsersFromLocalStorage(){
  var users = JSON.parse(localStorage.getItem('resultsInLocalStorage'));
  for (var i = 0; i < users.length; i++){
    User.userArray.push(users[i]);
  }

}

// create colorArray for balloons
Balloon.colorArray = [
  { color: 'red', colorPic: 'assets/red-balloon.png' },
  { color: 'blue', colorPic: 'assets/blue-balloon.png' },
  { color: 'green', colorPic: 'assets/green-balloon.png' },
  { color: 'yellow', colorPic: 'assets/yellow-balloon.png' },
  { color: 'purple', colorPic: 'assets/purple-balloon.png' },
  { color: 'pink', colorPic: 'assets/pink-balloon.png' },
  { color: 'orange', colorPic: 'assets/orange-balloon.png' },
  { color: 'light-blue', colorPic: 'assets/light-blue-balloon.png' },
];

// create constructor for Balloons
function Balloon(index) {
  this.color = Balloon.colorArray[index].color;
  this.imageSrc = Balloon.colorArray[index].colorPic;
}

// create constructor for user
// allScores is an array of all the scores/attempts at playing the game
function User(name) {
  this.name = name;
  this.currentScore = 0;
  this.highScore = 0;
  this.allScores = [];
  User.userArray.push(this);
}

// create renderCurrentScore function
function renderCurrentScore() {
  var targetDiv = document.getElementById('game');
  var createH3 = document.createElement('h3');
  createH3.id = 'currentScore';
  createH3.innerHTML =
    'Current Score: ' + User.userArray[User.userArray.length - 1].currentScore;
  targetDiv.appendChild(createH3);
}

function popBalloon(){
  var audio = new Audio("assets/Balloon-pop.mp3");
  audio.play();
}

// create event listener for form
// this will be targetting the submit/play button
var formSubmission = document.getElementById('form');
formSubmission.addEventListener('submit', submitHandler);

// create an event handler for form
function submitHandler(event) {
  event.preventDefault();
  var userValue = document.getElementById('name');
  new User(userValue.value);
  var target = document.getElementById('deleteMe');
  target.innerHTML = '';
  var createDiv = document.createElement('div');
  createDiv.id = 'game';
  target.appendChild(createDiv);
  renderCurrentScore();
  var divEl = document.getElementById('game');
  var anotherH3 = document.createElement('h3');
  anotherH3.id = 'clickAnywhere';
  anotherH3.textContent = 'Click anywhere to begin';
  divEl.appendChild(anotherH3);

  startTimer();
  startBalloons();
}

function balloonClickHandler(event) {
  
  if (event.target.id === Balloon.colorArray[Balloon.goodBalloonArray[0]].color) {
    // if color === 'selected-color', add points to score
    User.userArray[User.userArray.length - 1].currentScore++;
    popBalloon();
  } else {
    for (var i = 1; i < Balloon.colorArray.length; i++) {
      if (event.target.id === Balloon.colorArray[i].color) {
        // else color !== 'selected-color', remove points from score
        User.userArray[User.userArray.length - 1].currentScore--;
        popBalloon();
      }
    }
  }
  renderCurrentScore();
  document.getElementById('currentScore').remove();
  if (event.target.tagName === 'IMG') {
    // when balloon is clicked, remove from DOM
    event.target.remove();
  }
}

// render instructions on screen for which color balloon to click
function renderInstructions() {
  var target = document.getElementById('game');
  var h1 = document.createElement('h1');
  h1.id = 'instructions';
  h1.innerHTML = 'Click the ' + Balloon.colorArray[Balloon.goodBalloonArray[0]].color + ' balloons';
  h1.style.backgroundColor = Balloon.colorArray[Balloon.goodBalloonArray[0]].color;
  setInterval(function() {
    h1.style.backgroundColor = '';
  }, 1000);

  target.appendChild(h1);
}
Balloon.goodBalloonArray = [];
function goodBalloon(){
  console.log('random index array start of the render ' + Balloon.goodBalloonArray);
  Balloon.goodBalloonArray = [];
  console.log('random index array after it was cleared ' + Balloon.goodBalloonArray);

  var randomIndex = Math.floor(Math.random() * (Balloon.colorArray.length -1));
  Balloon.goodBalloonArray.push(randomIndex)
  console.log('random index' + randomIndex);
  console.log('random index array after it was pushed ' + Balloon.goodBalloonArray);
  var divEl = document.getElementById('game');
  var createImg = document.createElement('img');
  var newBalloon = new Balloon(randomIndex);
  var balloonLeft = Math.floor(Math.random() * (100 - 10));
  var balloonTop = Math.floor(Math.random() * (90 - 15) + 10);
  createImg.src = newBalloon.imageSrc;
  createImg.id = newBalloon.color;
  createImg.style.position = 'absolute';
  createImg.style.left = balloonLeft + '%';
  createImg.style.top = balloonTop + '%'; // min 100 px
  createImg.style.height = '100px';
  divEl.appendChild(createImg);
}

function badBalloon(){
  var target = document.getElementById('game');
  var balloonLeft = Math.floor(Math.random() * (100 - 10));
  var balloonTop = Math.floor(Math.random() * (90 - 15) + 10);
  var randomIndex = Math.floor(Math.random() * (Balloon.colorArray.length -1));
  console.log(randomIndex);
  var createImg = document.createElement('img');
  var newRandomBalloon = new Balloon(randomIndex);
  createImg.id = newRandomBalloon.color;
  createImg.src = newRandomBalloon.imageSrc;
  createImg.style.position = 'absolute';
  createImg.style.left = balloonLeft + '%';
  createImg.style.top = balloonTop + '%'; // min 100 px
  createImg.style.height = '100px';
  target.appendChild(createImg);

}
// create renderBalloons function
function renderBalloons() {
  stopBalloons();
  var divEl = document.getElementById('game');
  divEl.addEventListener('click', balloonClickHandler);
  //  render balloons to the page every x seconds using the increased balloon count
  var randomBalloon = 2;
  var balloonCount = 1;
  
  goodBalloon();
  renderInstructions();
  balloonCount = balloonCount + 1;
  badBalloon();

  var sec = 25;
  for (var i = 0; i < randomBalloon; i++) {
    badBalloon();
  }
  randomBalloon = randomBalloon + 2;

  var balloonRender = setInterval(function () {
    for (i = 0; i < balloonCount; i++) {
      //loop for the target balloons
      goodBalloon();
      document.getElementById('instructions').remove();
      renderInstructions();

    }
    balloonCount = balloonCount + 1;
    for (i = 0; i < randomBalloon; i++) {
      //loop for the target balloons
     badBalloon();
    }
    randomBalloon = randomBalloon + 2;
    sec = sec - 3;
    if (sec < 0) {
      clearInterval(balloonRender);
    }
  }, 3000);
}

function startTimer() {
  var timerEvent = document.getElementById('game');
  // add event listener for starting the timer
  timerEvent.addEventListener('click', handleTimer);
}

function startBalloons() {
  var balloonEvent = document.getElementById('game');
  // addEventListener function for clicking of balloons
  balloonEvent.addEventListener('click', renderBalloons);
}
function stopBalloons() {
  document.getElementById('game').removeEventListener('click', renderBalloons);
}

function stopTimer() {
  var timerEvent = document.getElementById('game');
  timerEvent.removeEventListener('click', handleTimer);
}

function renderGif() {
  var target = document.getElementById('game');
  var createImg = document.createElement('img');
  createImg.src = "https://media.giphy.com/media/NSHwhrFyDcLY1RSkkw/source.gif";
  createImg.id = "balloon-gif";
  target.appendChild(createImg);
  setTimeout( function(){
    popBalloon();
    createImg.remove();
    var target = document.getElementById('game');
    var createImgGameOver = document.createElement('img');
    createImgGameOver.src = "https://media.giphy.com/media/1hMbkOaFfYmZvvEBq9/source.gif";
    createImgGameOver.id = "game-over-gif";
    target.appendChild(createImgGameOver);
  }, 1900);
}

//bind the timer to the event
function handleTimer(event) {
  var sec = 30;
  var timer = setInterval(function () {
    document.getElementById('timer').innerHTML =
      '00:' + sec.toString().padStart(2, '0');
    sec--;
    if (sec < 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
  timerRender(timer);
}

function timerRender(interval) {
  var divEl = document.getElementById('game');
  var createH3 = document.createElement('h3');
  createH3.textContent = interval;
  createH3.id = 'timer';
  divEl.appendChild(createH3);

  var h3 = document.getElementById('clickAnywhere');
  h3.remove();
  stopTimer();
}

function endGame() {
  document.getElementById('game').remove();
  var createDiv = document.createElement('div');
  var target = document.getElementById('deleteMe')
  createDiv.id = 'game';
  target.appendChild(createDiv);

  renderGif();
  // push currentScore into array
  User.userArray[User.userArray.length - 1].allScores.push(
    User.userArray[User.userArray.length - 1].currentScore
  );
  // store userArray array in local storage
  var stringyUserResults = JSON.stringify(User.userArray);
  localStorage.setItem('resultsInLocalStorage', stringyUserResults);

  setTimeout( function(){
    // send user to results page
    window.location.href = 'https://mgalush.github.io/balloons/results';
  }, 6000);
}
