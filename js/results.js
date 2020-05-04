/* eslint-disable indent */
'use strict';
function renderResults() {
  // get results from local storage

  var greeting;
  greeting = document.getElementById('greeting');

  if (!localStorage.getItem('resultsInLocalStorage')){
    greeting.textContent = 'No results yet!';
  }
  var stringResultsInStorage = JSON.parse(localStorage.getItem('resultsInLocalStorage'));

  var player = formatName(stringResultsInStorage[stringResultsInStorage.length -1].name);
    greeting.textContent = 'Thanks for playing, ' + player + '!';
  var tableToTarget = document.getElementById('results');
  // renderTableHeader(tableToTarget);

  var scoreRow = document.createElement('tr');
  var scoreTd = document.createElement('td');
  scoreTd.textContent = 'Your score:';
  scoreRow.appendChild(scoreTd);
  scoreTd = document.createElement('td');
  scoreTd.textContent = stringResultsInStorage[stringResultsInStorage.length -1].currentScore;
  scoreRow.appendChild(scoreTd);
  tableToTarget.appendChild(scoreRow);

  scoreRow = document.createElement('tr');
  scoreTd = document.createElement('td');
  scoreTd.textContent = 'Your high score:';
  scoreRow.appendChild(scoreTd);
  scoreTd = document.createElement('td');
  scoreTd.textContent = stringResultsInStorage[stringResultsInStorage.length -1].highScore;
  scoreRow.appendChild(scoreTd);
  tableToTarget.appendChild(scoreRow);

  // put game results inside table
  // for (var i = 0; i < stringResultsInStorage[stringResultsInStorage.length - 1].allScores.length; i++) {
  //   var newTrEl = document.createElement('tr');
  //   var newTdEl = document.createElement('td');
  //   newTdEl.textContent = stringResultsInStorage[stringResultsInStorage.length - 1].name;
  //   newTrEl.appendChild(newTdEl);
  //   newTdEl = document.createElement('td');
  //   newTdEl.textContent = stringResultsInStorage[stringResultsInStorage.length - 1].allScores[i];
  //   newTrEl.appendChild(newTdEl);
  //   tableToTarget.appendChild(newTrEl);
  // }

  // create past results table
  if (stringResultsInStorage.length > 1) {
    var heading = document.getElementById('other-players');
    heading.textContent = 'Other Players\' High Scores';
    tableToTarget = document.getElementById('past-results');
    renderTableHeader(tableToTarget);


    var maxResults = 10;
    var rows = 0;
    var num = stringResultsInStorage.length -2;
      for (var j = num; j >= 0; j--){
        if (rows < maxResults){
          var newTrEl = document.createElement('tr');
          var newTdEl = document.createElement('td');
          newTdEl.textContent = stringResultsInStorage[j].name;

          newTrEl.appendChild(newTdEl);
          newTdEl = document.createElement('td');
          newTdEl.textContent = stringResultsInStorage[j].highScore;
          newTrEl.appendChild(newTdEl);
          tableToTarget.appendChild(newTrEl);
          rows++;
          }
        }
  }

}

function formatName (name){
  var newName = name.toLowerCase();
  return newName.charAt(0).toUpperCase() + newName.slice(1);
}

function renderTableHeader(table){
  //create the header row for the results table
  var newTrEl = document.createElement('tr');
  var newThEl = document.createElement('th');
  newThEl.textContent = 'NAME';
  newTrEl.appendChild(newThEl);
  newThEl = document.createElement('th');
  newThEl.textContent = 'SCORE';
  newTrEl.appendChild(newThEl);
  table.appendChild(newTrEl);
}

var resetScoresButton = document.getElementById('resetScores');
resetScoresButton.addEventListener('click', function(){
  localStorage.clear();
  location.reload();
});


renderResults();
