// Google API client ID
const CLIENT_ID = '825538423774-seramrvgddmil226bdmsguii9hnu7gn9.apps.googleusercontent.com';
const API_KEY = '<AIzaSyCvd2tJiLia280MuWpa6EZm29kdeyIU3C8>';
const SHEET_ID = '<YOUR_SHEET_ID>';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

// Button and element references
const sheetUpload = document.getElementById("sheet-upload");
const optionsDiv = document.getElementById("options");
const restartButton = document.getElementById("restart-game");
const resumeButton = document.getElementById("resume-game");

let gapiInitialized = false;

// Initialize Google API client
function initializeGapi() {
    gapi.load("client:auth2", async () => {
        await gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
        });
        gapiInitialized = true;
    });
}

// Handle Google Sign-In success
async function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    console.log(`Welcome, ${profile.getName()}`);
    sheetUpload.classList.remove("hidden"); // Show upload button
}

// Handle file upload
sheetUpload.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Assume data is uploaded to the Google Sheet here
    console.log("File uploaded:", file.name);

    const sheetData = await fetchSheetData();
    if (sheetData.length > 0) {
        optionsDiv.classList.remove("hidden"); // Show restart/resume options
        sheetUpload.classList.add("hidden"); // Hide upload button
    } else {
        startNewGame(); // Start new game
    }
});

// Fetch data from the Google Sheet
async function fetchSheetData() {
    try {
        const response = await gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: "Sheet1!A1:Z1000",
        });
        return response.result.values || [];
    } catch (error) {
        console.error("Error fetching sheet data:", error);
        return [];
    }
}

// Start a new game
function startNewGame() {
    console.log("Starting a new game...");
    // Logic to clear sheet data and redirect to the new game page
}

// Restart the game
restartButton.addEventListener("click", async () => {
    console.log("Restarting the game...");
    await clearSheetData();
    startNewGame();
});

// Resume the game
resumeButton.addEventListener("click", () => {
    console.log("Resuming the game...");
    // Logic to redirect to resume page
});

// Clear the Google Sheet data
async function clearSheetData() {
    try {
        await gapi.client.sheets.spreadsheets.values.clear({
            spreadsheetId: SHEET_ID,
            range: "Sheet1",
        });
        console.log("Sheet data cleared.");
    } catch (error) {
        console.error("Error clearing sheet data:", error);
    }
}

// Initialize API client on load
initializeGapi();
