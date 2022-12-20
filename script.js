const text = "someone is sitting in the shade today because someone planted a tree a long time ago";

let startTime, endTime;

// Define the URL of the API
const apiUrl = 'http://127.0.0.1:9996/api/';
let words = document.getElementById('text');
let title = document.getElementById('title');
let body = document.getElementById('body');
let ranko = document.getElementById('rank');
let blabla = "";
let writed = [];
let wpm_value = 0;
writed = Array(text.length).fill(0);

let words_writed = 0; // Total words writed by the user

let time = 0;

let key = document.getElementById(text[words_writed]);
key.classList.add("selected"); //Here adding a animation and init some things..

var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;
if(isAndroid) {
  document.write("Sorry Android Users! Only Pc Allowed Here :D")
}

function wpm(){
  //nothing fancy, just calculating wpm!
  if(words_writed == text.length-1){
    wpm_value = Math.round(((text.length-1)/5)/total_time);
  }
}

function rank(){
// Fetch the data from the API
fetch(apiUrl+'ranks.php')
    .then(response => response.json())
    .then(data => {
        // Get the table element
        let table = document.getElementById('table');

        // Loop through the data
        for (let ranking in data) {
            // Access the wpm and username values
            let wpmlol = data[ranking].wpm;
            let username = data[ranking].username;

            // Create a new table row
            let row = table.insertRow(-1);

            // Insert the ranking, wpm, and username values into the cells of the row
            let rankingCell = row.insertCell(0);
            rankingCell.innerHTML = ranking;

            let wpmCell = row.insertCell(1);
            wpmCell.innerHTML = wpmlol;

            let usernameCell = row.insertCell(2);
            usernameCell.innerHTML = username;
        }
    });
}

function update(){
  //i know... it dosen't looks like the best way to do the job, but it works fine!
  a = 0;
  b = "";
  let c = "";
  for(i = 0; i < text.length; i++){
    if(writed[i] == 0){
      c += text[a];
      a++;
    }
    else {
      b += text[a];
      a++;
    }
  }
  words.innerHTML = "<strong>" + b + "</strong>" + c;
}

document.addEventListener("keydown", event => {
  if(words_writed == 0){
    startTime = new Date();
    startTime = startTime.getTime();
    words.innerHTML = text;
    title.innerHTML = "Write! Write! Fast! Fast!";
  }
  if(words_writed == text.length-1){
    endTime = new Date;
    endTime = endTime.getTime();
    total_time = endTime - startTime;
    total_time = (total_time/1000)/60;
    rank();
    wpm();
  
    const root = document.querySelector('body');

    const wpmm = document.createElement('h1');
    wpmm.classList.add('shit');
    wpmm.textContent = `WPM: ${wpm_value}`;
    
    const title = document.createElement('h1');
    title.classList.add('shit');
    title.id = 'title';
    title.textContent = 'Put here a username so people can see your wpm and you can see your rank:';
    
    const form = document.createElement('form');
    form.style.display = 'flex';
    form.style.alignItems = 'center';
    
    const label = document.createElement('label');
    label.for = 'username';
    label.style.fontSize = '18px';
    label.style.fontWeight = 'bold';
    label.textContent = 'Username:';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'username';
    input.style.fontSize = '18px';
    input.style.padding = '8px';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '4px';
    
    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'submit-button';
    button.onclick = submit;
    button.style.fontSize = '18px';
    button.style.padding = '8px';
    button.style.border = 'none';
    button.style.borderRadius = '4px';
    button.style.backgroundColor = '#4caf50';
    button.style.color = 'white';
    button.textContent = 'Submit';
    
    const table = document.createElement('table');
    table.id = 'table';
    
    const row = document.createElement('tr');
    
    const ranking = document.createElement('th');
    ranking.textContent = 'Ranking';
    
    const wpmColumn = document.createElement('th');
    wpmColumn.textContent = 'WPM';
    
    const usernameColumn = document.createElement('th');
    usernameColumn.textContent = 'Username';
    
    row.append(ranking, wpmColumn, usernameColumn);
    table.append(row);
    
    form.append(label, input, button);
    root.append(wpmm, title, form, table);
    
    words_writed = text.length;
  }
  const keyPressed = event.key;
  const keyElement = document.getElementById(keyPressed);
  const highlightedKey = document.querySelector(".selected");

  keyElement.classList.add("hit");
  keyElement.addEventListener('animationend', () => {
    keyElement.classList.remove("hit")
  })

  if (event.key == text[words_writed]) {
    writed[words_writed] = 1;
    words_writed += 1;
    key.classList.remove("selected");
    console.log(words_writed);
    key = document.getElementById(text[words_writed]);
    key.classList.add("selected");
    update();
  }
});

// If Onclick Happens, This Should Happen!
function submit(){
  let input = document.getElementById('username');
  // Get the value of the input element
  let username = input.value;

  // Send the request to the API
  fetch(`${apiUrl}wpm.php?username=${username}&wpm=${wpm_value}`)
      .then(response => response.text())
      .then(data => {
          // Display the response from the server
          console.log(data);
      });
  document.write("Your name now is in the database! reload!")
}