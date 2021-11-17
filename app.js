let express = require('express');
let ejs = require('ejs');
var jsdom = require('jsdom'); // Wird für JQuery benötigt
const { red } = require('color-name');
$ = require('jquery')(new jsdom.JSDOM().window);
let bodyParser = require('body-parser');

// Filehandling:
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Quizz', { useNewUrlParser: true });
// Mongoose Schema
// Gibt Struktur des Datensatzes vor
const room_scheme = new mongoose.Schema({
    name: String,
    password: String,
    questions: Array
});
// Mongoose Model
const Room = mongoose.model("Room", room_scheme);

// Mongoose für Registrierung
const registration_scheme = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const User = mongoose.model("User", registration_scheme);

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
    console.log("Name des Raums: " + req.body.room_name);
    let questions_array = [];
    let q = 1;
    // Check if q_n existiert
    if ('q_' + q in req.body) {
        let s = 'q_' + q;
        let a = 1;
        // füge Frage hinzu (Ganzes Object erstellen)
        questions_array.push({
            question: req.body.s,
            answers: []
        });
        if ('q_' + q + '_a_' + a in req.body) {
            let sa = 'q_' + q + '_a_' + a;
            questions_array[0].answers.push(req.body.sa);
        }
    }
    // Wenn ja dann füge alle Antworten hinzu
    // Check if q_n_a_j existiert

    // Wenn ja, füge antwort in Antwortarray hinzu

    // Wenn nein, beende schleife und erhöhe q um 1

    const room = new Room({
        name: req.body.room_name,
        password: req.body.room_password,
        questions: questions_array
    });
    room.save();
    Room.find(function(err, rooms) {
        if (err) {
            console.log("FEHLER" + err);
        } else {
            console.log("INHALT" + rooms);
        }
    });

    res.render('data_view', { name: req.body });
});

app.get('/login', (req, res) => {
    let alert = "";
    res.render('login', { alert: alert });
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/login', (req, res) => {
    // Verification of Input Data
    if (req.body.user_name == "" || req.body.user_password == "") {
        let alert = "Error: Username or Password is empty";
        res.render('login', { alert: alert });
        console.log("ein feld ist leer");
    }

    // Verification of User
    User.findOne({ name: req.body.user_name }, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            if (data == null || data.password != req.body.user_password) {
                console.log("Fehler beim Login!");
            } else {
                console.log("Login erfolgreich!");
            }
        }
    });
});

app.post('/register', (req, res) => {
    // Registration of User
    const user = new User({
        name: req.body.user_name,
        email: req.body.user_email,
        password: req.body.user_password
    });
    User.findOne({ name: req.body.user_name }, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            if (data == null || data.name != req.body.user_name) {
                console.log("User " + req.body.user_name + " wird angelegt!");
                user.save();
            } else {
                console.log("User " + req.body.user_name + " existiert bereits!");
            }
        }
    });

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

// Vorerst wurden die JS Dateien aufgeteilt in einen Backend und Frontend Teil...