//Imports the library and the path module to build the web server as well as managing the file directories easily
const express = require('express');
const { urlAlphabet } = require('nanoid');
const path = require('path');

const app = express();
//Port number
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'publicFolder')));

app.get('/get-apod-data', async (req, res) => {
    try {
        const selectedDate = req.query.userDate;
        let apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=Key5Bj6HgR7ma3r4DES726kn3l0VzoHeYAbS8lTu';
        //Append the NASA url when the user selects a specfic date
        if (selectedDate){
            apiUrl += '&date=' + selectedDate;
        }
        //Fetch data from NASA API
        const response = await fetch(apiUrl);
        const data = await response.json();
        //send the JSON back to browser
        res.json(data);

    } catch (err) {

        console.error('Server error', err);
        res.status(500).json({error: 'Could not fetch NASA data'});
    }
});
//Program displays the index.html file when visiting the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'publicFolder', 'index.html'));
});

app.listen(PORT, () => {
    console.log("Server running at http://localhost:3000");
});
