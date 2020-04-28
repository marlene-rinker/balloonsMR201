/* eslint-disable indent */
'use strict';
function renderResults() {
  // get results from local storage
  var stringResultsInStorage = JSON.parse(localStorage.getItem('resultsInLocalStorage'));
  var tableToTarget = document.getElementById('results');
  renderTableHeader(tableToTarget);

  // put game results inside table
  for (var i = 0; i < stringResultsInStorage[stringResultsInStorage.length - 1].allScores.length; i++) {
    var newTrEl = document.createElement('tr');
    var newTdEl = document.createElement('td');
    newTdEl.textContent = stringResultsInStorage[stringResultsInStorage.length - 1].name;
    newTrEl.appendChild(newTdEl);
    newTdEl = document.createElement('td');
    newTdEl.textContent = stringResultsInStorage[stringResultsInStorage.length - 1].allScores[i];
    newTrEl.appendChild(newTdEl);
    tableToTarget.appendChild(newTrEl);
  }

  // create past results table
  tableToTarget = document.getElementById('past-results');
  renderTableHeader(tableToTarget);


  var maxResults = 10;
  var rows = 0;
  var num = stringResultsInStorage.length -2;
    for (var j = num; j >= 0; j--){
      if (rows < maxResults){
        newTrEl = document.createElement('tr');
        newTdEl = document.createElement('td');
        newTdEl.textContent = stringResultsInStorage[j].name;

        newTrEl.appendChild(newTdEl);
        newTdEl = document.createElement('td');
        newTdEl.textContent = stringResultsInStorage[j].currentScore;
        newTrEl.appendChild(newTdEl);
        tableToTarget.appendChild(newTrEl);
        rows++;
        }
      }
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
