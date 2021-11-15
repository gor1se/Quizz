let express = require('express');
let ejs = require('ejs');
var jsdom = require('jsdom'); // Wird für JQuery benötigt
const { red } = require('color-name');
$ = require('jquery')(new jsdom.JSDOM().window);
let bodyParser = require('body-parser');

// Filehandling:
let fs = require('fs');




const port = 3000;
const app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/new-room', (req, res) => {
    res.render('new_room');
});

app.post('/new-room', (req, res) => {
    console.log("Send Data...");
    console.log(req.body);
    // Hier folgt das Filehandling vorerst in TXT oder JSON - später Datenbank
    // fs.open('/datatt.txt', 'w', function(err, file) {
    //     if (err) throw err;
    //     // fs.appendFile('/data.txt', String(req.body), function(err) {
    //     //     if (err) throw err;
    //     //     console.log('Saved!');
    //     // });
    //     console.log('Saved!');
    // });

    res.render('data_view', { name: req.body });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

// Vorerst wurden die JS Dateien aufgeteilt in einen Backend und Frontend Teil...