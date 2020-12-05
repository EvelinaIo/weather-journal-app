
/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiId = `&appid=${config.API_KEY}&units=metric`;
const button = document.getElementById('generate');

// DOM values
const dateOutput = document.getElementById('date');
const tempOutput = document.getElementById('temp');
const feelInput = document.getElementById('feelings');
const content = document.getElementById('content');
const entry = document.querySelector('.entry');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth()+1}|${d.getDate()}|${d.getFullYear()}`;

// Add event listener for Generate
button.addEventListener('click', performAction);

// Promises for actions after click
function performAction(event) {
    event.preventDefault()
    // Get user's input
    const newZip = document.getElementById('zip').value;
    const newFeel = feelInput.value;
    const date = newDate;
    // Create url
    const url = baseURL + newZip + apiId;
    if(!newZip) {
        alert("Please insert a valid zip code")
    } else {
    // Get data from Open Weather API 
    getWeather (url)
        .then (function(receivedData) {
            // Add data to the post route
            const newTemp = receivedData.main.temp;
            const city = receivedData.name;
            const icon = receivedData.weather[0].icon;
            postData('/addData', { date, city, icon, newTemp, newFeel })
            .then (updateUI());
        })
    }
}

//Async function for openweather API
async function getWeather (url) {
    const request = await fetch(url)
    try {
        const receivedData = await request.json();
        console.log(receivedData);
        return receivedData;
    } catch (error) {
        console.log('error', error);
        content.innerHTML = 'Please insert Zip code and your feelings.';
    }
}

//Async function for post route
async function postData(url ='', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

//Async function for updating UI
async function updateUI() {
    const response = await fetch('/getData');
    try {
        const updateData = await response.json();
        console.log(updateData);
        // Update date innerHTML
        dateOutput.innerHTML = `${updateData.date}, ${updateData.city}`;
        // Update temp div innerHTML
        tempOutput.innerHTML = `<img class="icon" src="http://openweathermap.org/img/wn/${updateData.icon}@2x.png" alt="Weather Icon">${updateData.newTemp.toFixed(0)}\xb0C`;
        // Update content div innerHTML
        content.innerHTML = updateData.newFeel;
        entry.classList.remove("hide");
    } catch (error) {
        console.log('error', error);
        content.innerHTML = 'Please insert Zip code and your feelings.';
    }
}


