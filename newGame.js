(function() {
    // Add player to Google Sheets
    function addPlayerToSheet(playerName, contactInfo, imageUrl) {
        const data = [
            [playerName, contactInfo, imageUrl, '']
        ];

        gapi.client.sheets.spreadsheets.values.append({
            spreadsheetId: '1UGn5QjkFzyjeXeLWpfW1jQEL-9_UyvPJlx2bzQF6XmE', // Replace with your actual Spreadsheet ID
            range: 'Sheet1!A2:D', // Adjust range based on your data
            valueInputOption: 'RAW',
            resource: {
                values: data,
            }
        }).then((response) => {
            console.log('Player added:', response);
        });
    }

    // Handle the new game form submission
    document.getElementById('newGameForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const playerName = document.getElementById('playerName').value;
        const contactInfo = document.getElementById('contactInfo').value;
        const imageUrl = document.getElementById('imageUrl').value;

        addPlayerToSheet(playerName, contactInfo, imageUrl);
    });
})();
