(function() {
    // Function to update player info in Google Sheets
    function updatePlayerInfo(playerName, contactInfo, imageUrl) {
        const data = [
            [playerName, contactInfo, imageUrl, '']
        ];

        gapi.client.sheets.spreadsheets.values.update({
            spreadsheetId: '1UGn5QjkFzyjeXeLWpfW1jQEL-9_UyvPJlx2bzQF6XmE', // Replace with your actual Spreadsheet ID
            range: 'Sheet1!A2:D', // Adjust range based on your data
            valueInputOption: 'RAW',
            resource: {
                values: data,
            }
        }).then((response) => {
            console.log('Player info updated:', response);
        });
    }

    // Handle the edit game form submission
    document.getElementById('editGameForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const playerName = document.getElementById('editPlayerName').value;
        const contactInfo = document.getElementById('editContactInfo').value;
        const imageUrl = document.getElementById('editImageUrl').value;

        updatePlayerInfo(playerName, contactInfo, imageUrl);
    });
})();
