let express = require('express');
let ejs = require('ejs');
var jsdom = require('jsdom'); // Wird für JQuery benötigt
$ = require('jquery')(new jsdom.JSDOM().window);

const port = 3000;
const app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

// Vorerst wurden die JS Dateien aufgeteilt in einen Backend und Frontend Teil...