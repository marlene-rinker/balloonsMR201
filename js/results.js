'use strict';
function renderResults() {
  // get results from local storage
  var stringResultsInStorage = JSON.parse(localStorage.getItem('resultsInLocalStorage'));
  var tableToTarget = document.getElementById('results');
  renderTableHeader(tableToTarget);
 
  // put results inside table
  for (
    var i = 0; i < stringResultsInStorage[stringResultsInStorage.length - 1].allScores.length; i++) {
    var newTrEl = document.createElement('tr');
    var newTdEl = document.createElement('td');
    newTdEl.textContent = stringResultsInStorage[stringResultsInStorage.length - 1].name;
    newTrEl.appendChild(newTdEl);
    newTdEl = document.createElement('td');
    newTdEl.textContent = stringResultsInStorage[stringResultsInStorage.length - 1].allScores[i];
    newTrEl.appendChild(newTdEl);
    tableToTarget.appendChild(newTrEl);
  }
  tableToTarget = document.getElementById('past-results');
  renderTableHeader(tableToTarget);


  var num = stringResultsInStorage.length -2;
  console.log(stringResultsInStorage);
  console.log(num);
  console.log(stringResultsInStorage[0].name);
  console.log(stringResultsInStorage[1].name);
  for (var i = num; i >= 0; i--){
    var newTrEl = document.createElement('tr');
    var newTdEl = document.createElement('td');
    newTdEl.textContent = stringResultsInStorage[i].name;

    newTrEl.appendChild(newTdEl);
    newTdEl = document.createElement('td');
    newTdEl.textContent = stringResultsInStorage[i].currentScore;
    newTrEl.appendChild(newTdEl);
    tableToTarget.appendChild(newTrEl);
  }

  // for (
  //   var i = 0; i < stringResultsInStorage[stringResultsInStorage.length - 1].allScores.length; i++) {
  //   var newTrEl = document.createElement('tr');
  //   var newTdEl = document.createElement('td');
  //   newTdEl.textContent = stringResultsInStorage[stringResultsInStorage.length - 1].name;
  //   newTrEl.appendChild(newTdEl);
  //   newTdEl = document.createElement('td');
  //   newTdEl.textContent = stringResultsInStorage[stringResultsInStorage.length - 1].allScores[i];
  //   newTrEl.appendChild(newTdEl);
  //   tableToTarget.appendChild(newTrEl);
// }
}

function renderTableHeader(table){
   // create table for results
  
  //create the header row
  var newTrEl = document.createElement('tr');
  var newThEl = document.createElement('th');
  newThEl.textContent = 'NAME';
  newTrEl.appendChild(newThEl);
  newThEl = document.createElement('th');
  newThEl.textContent = 'SCORE';
  newTrEl.appendChild(newThEl);
  table.appendChild(newTrEl);
}


renderResults();
