//const { mainModule } = require("process");

/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=9c7393e7971026d0a49347d1c811e1d8';
const button = document.getElementById('generate');

// DOM values
const dateOutput = document.getElementById('date');
const tempOutput = document.getElementById('temp');
const feelInput = document.getElementById('feelings');
const content = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Add event listener for Generate
button.addEventListener('click', performAction);

function performAction(event) {
    event.preventDefault()
    // Get user's input
    const newZip = document.getElementById('zip').value;
    const newFeel = feelInput.value;
    const date = newDate;
    // Create url
    const url = baseURL + newZip + apiKey;
    // Get data from Open Weather API 
    getWeather (url)
        .then (function(receivedData) {
            // Add data
            const newTemp = receivedData.main.temp;
            const city = receivedData.name;
            const icon = receivedData.weather[0].icon;
            postData('/addData', { date, city,  newTemp, newFeel })
        })
        .then (updateUI());
}

async function getWeather (url) {
    const request = await fetch(url)
    try {
        const receivedData = await request.json();
        console.log(receivedData);
        return receivedData;
    } catch (error) {
        console.log('error', error);
        content.innerHTML = 'Please insert Zip code and your feelings.';
        // appropriately handle the error
    }
}

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

async function updateUI() {
    const response = await fetch('/getData');
    try {
        const updateData = await response.json();
        console.log(updateData);
        tempOutput.innerHTML = updateData.newTemp;
        content.innerHTML = updateData.newFeel;
        dateOutput.innerHTML = `Today is ${updateData.date} and the temperature in ${updateData.city} is`;
    } catch (error) {
        console.log('error', error);
        content.innerHTML = 'Please insert Zip code and your feelings.';
    }
}


