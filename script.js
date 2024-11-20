(function() {
    // Google API credentials
    const CLIENT_ID = '825538423774-seramrvgddmil226bdmsguii9hnu7gn9.apps.googleusercontent.com'; // Replace with your actual Client ID
    const API_KEY = 'AIzaSyCvd2tJiLia280MuWpa6EZm29kdeyIU3C8';     // Replace with your actual API Key
    const SPREADSHEET_ID = '1UGn5QjkFzyjeXeLWpfW1jQEL-9_UyvPJlx2bzQF6XmE'; // Replace with your actual Spreadsheet ID
    const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

    let GoogleAuth;

    // Initialize Google API client
    function start() {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: SCOPES,
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        }).then(function() {
            GoogleAuth = gapi.auth2.getAuthInstance();
        });
    }

    // Load client
    function loadClient() {
        gapi.load("client:auth2", start);
    }

    // Function to get data from Google Sheets (resume game)
    function resumeGame() {
        if (!GoogleAuth.isSignedIn.get()) {
            GoogleAuth.signIn();
        }

        gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A2:D', // Adjust range based on your data
        }).then((response) => {
            console.log('Data from sheet:', response.result.values);
            // Process the data and show/edit player information
            window.location.href = "editGame.html"; // Redirect to the edit page
        });
    }

    // Function to start a new game (navigate to new game page)
    function startNewGame() {
        window.location.href = "newGame.html"; // Redirect to new game page
    }

    // Wait for the DOM to fully load before adding event listeners
    document.addEventListener('DOMContentLoaded', function() {
        const resumeButton = document.getElementById('resumeGame');
        const newGameButton = document.getElementById('startNewGame');

        if (resumeButton) {
            resumeButton.addEventListener('click', resumeGame);
        } else {
            console.error('Resume Game button not found!');
        }

        if (newGameButton) {
            newGameButton.addEventListener('click', startNewGame);
        } else {
            console.error('Start New Game button not found!');
        }
    });

    // Load the Google API client when the window is loaded
    window.onload = loadClient;
})();
