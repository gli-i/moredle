# Moredle  
## [https://moredle-28217.web.app/](https://moredle-28217.web.app/)

### Based off of the New York Times game [Wordle](https://www.nytimes.com/games/wordle/index.html), with additional gamemodes and stats saving

### Adapted from Fall 2023 CMPT276 Group Project:
[https://github.com/sw2003/cmpt276-wordle](https://github.com/sw2003/cmpt276-wordle)

### Changes from original project:
- added additional gamemode: Blanks, along with guide on the HowToPlay page
- redid user signup, login and data storage with own storage API
- fully implemented and designed stats page
- greatly expanded word bank and changed the implementation of getting new answers
- minor UI changes, notably on the navigation bar and the signup and login pages


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Setup & Installation

## 1. 'git clone' the code onto your local computer

## 2. Run 'npm install' to download the required modules
If there is a dependency error, run 'npm install --legacy-peer-deps'  

## 3. Register for Firebase at https://firebase.google.com/ and create a new project at https://console.firebase.google.com/u/0/
Add a new app by click the Web Icon (</>)  

## 4. Create a .env file in the project's root folder, with the following contents, filling it in with the SDKs given to you in your newly created Firebase app:
REACT_APP_API_KEY=YOUR_API_KEY  
REACT_APP_AUTH_DOMAIN=YOUR_AUTH_DOMAIN  
REACT_APP_PROJECT_ID=YOUR_PROJECT_ID  
REACT_APP_STORAGE_BUCKET=YOUR_STORAGE_BUCKET  
REACT_APP_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID  

## 5. Run the code by running 'npm start' to launch it into your browser