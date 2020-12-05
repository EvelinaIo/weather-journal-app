# Weather Journal app

## Description
The project creates an asynchronous web app that uses an external web API and the user's input to gather data and update UI.
Uses Node and Express to run on a local server.

## Prerequisite
If you don't have Node already installed on your machine, you can download it [**here**](https://nodejs.org/en/download/).
You will also need an API key for [OpenWeatherMap.org](https://openweathermap.org/), which you can get [**here**](https://home.openweathermap.org/users/sign_up).
Then replace your key in the **config-example.js** file and rename the file to **config.js**.

## Installation
If Node is installed, then you can use the Node Package Manager to install the packages needed to run this program, which are express, body-parser and cors. You can run this command on your Terminal followed by the name of each package:

```
npm install
```
When those packages have installed, start the server with the following command.

```
node server.js
```

## Instructions for Use
Enter a zip code and your feelings for the day in the relevant areas.
Hit Generate and see under “Most Recent Entry” the date, the corresponding city, the temperature in Celsius and your feelings.

## Author
The code was written by EvelinaIo, based on starter code given by Udacity's Front-End Development Nanodegree course, Project 3.
