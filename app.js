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

const question_scheme = new mongoose.Schema({
    question: String,
    answers: [String],
    reviews_positive: Number,
    reviews_negative: Number,
    reviewed_by: Array,
    active: Boolean
});

const Question = mongoose.model("Question", question_scheme);

const room_scheme = new mongoose.Schema({
    name: String,
    password: String,
    private: Boolean,
    positive_reviews_neccessary: Number,
    positive_reviews_neccessary_percentage: Number,
    only_admins_can_add_and_review: Boolean,
    answered_questions_in_room: Number,
    creater_of_room: String,
    users_of_room: Array,
    questions: [question_scheme]
});
// Mongoose Model
const Room = mongoose.model("Room", room_scheme);



// Mongoose für Registrierung
const registration_scheme = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    logged_in: Boolean,
    veryfied: Boolean,
    questions_answered: Number,
    rooms: Array
});

const User = mongoose.model("User", registration_scheme);

const port = 3000;
const app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set current User for Login
let current_user = {
    logged_in: false,
    name: "Login",
    passwort: "",
    email: "",
    veryfied: false,
    questions_answered: 0
}

app.get('/', (req, res) => {
    res.render('index', { current_user_name: current_user.name });
});

app.get('/new-room', (req, res) => {
    res.render('new_room', { current_user_name: current_user.name });
});

app.post('/new-room', (req, res) => {
    // Check input data

    // Server Logic
    let schema_array = [];
    let obj_length = Object.keys(req.body).length;
    for (let i = 1; i < obj_length; i++) {
        if ('q_' + i in req.body) {
            const question = new Question({
                question: "",
                answers: [],
                reviews_positive: Number,
                reviews_negative: Number,
                reviewed_by: [Array],
                active: Boolean
            });
            let s = 'q_' + i;
            for (let j = 1; j < (obj_length / 2); j++) {
                // Werte eigentlich egal, da durch break statement abgebrochen wird.
                if ('q_' + i + '_a_' + j in req.body) {
                    question.answers.push(req.body['q_' + i + '_a_' + j]);
                } else {
                    break;
                }

            }
            question.reviews_positive = 0;
            question.reviews_negative = 0;
            question.reviewed_by = [];
            question.active = true;
            question.question = req.body['q_' + i];
            schema_array.push(question);
        } else {
            break;
        }
    }
    let alert = "";
    const room = new Room({
        name: req.body.room_name,
        password: req.body.room_password,
        private: false,
        positive_reviews_neccessary: 2,
        positive_reviews_neccessary_percentage: .5,
        only_admins_can_add_and_review: false,
        answered_questions_in_room: 0,
        creater_of_room: current_user.name,
        users_of_room: [current_user.name],
        questions: schema_array
    });

    room.save();

    res.render('data_view', { name: req.body, current_user_name: current_user.name });
});

app.get('/find-room', (req, res) => {
    Room.find((error, data) => {
        if (error) {
            console.log(error);
        } else {
            res.render('find_room', { current_user_name: current_user.name, data: data });
        }
    })
});

app.get('/login', (req, res) => {
    let alert = "";
    res.render('login', { alert: alert, current_user_name: current_user.name });
});

app.get('/register', (req, res) => {
    let alert = "";
    res.render('register', { alert: alert, current_user_name: current_user.name });
});

app.get('/profile', (req, res) => {
    res.render('profile', { current_user_name: current_user.name });
});

app.post('/login', (req, res) => {
    // Verification of Input Data
    let alert = "";
    if (req.body.user_name == "" || req.body.user_password == "") {
        alert = "Error: Username or Password is empty";
        return res.render('login', { alert: alert, current_user_name: current_user.name });
    }

    // Verification of User
    User.findOne({ name: req.body.user_name }, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            if (data == null || data.password != req.body.user_password) {
                alert = "Error: Username or Password is wrong";
                res.render('login', { alert: alert, current_user_name: current_user.name });
                console.log("Fehler beim Login!");
            } else {
                // Hier sollten alle Daten geändert werden, nicht nur der Username!
                current_user.name = data.name;
                res.render('profile', { current_user_name: current_user.name });
                console.log("Login erfolgreich!");
            }
        }
    });
});

app.post('/register', (req, res) => {
    // Verification of Input Data
    let alert = "";
    if (req.body.user_name == "" || req.body.user_email == "" || req.body.user_password == "" || req.body.user_password_check == "") {
        alert = "Error: Please Enter Data in all of the Fields!";
        return res.render('register', { alert: alert, current_user_name: current_user.name });
    } else if (req.body.user_password.length < 6) {
        alert = "Error: Your Password must be at least 6 characters long!";
        return res.render('register', { alert: alert, current_user_name: current_user.name });
    } else if (req.body.user_password_check != req.body.user_password) {
        alert = "Error: Your Passwords need to match!";
        return res.render('register', { alert: alert, current_user_name: current_user.name });
    }
    // Registration of User
    // Check if Username is already used
    // Check if EMail is already used
    const user = new User({
        name: req.body.user_name,
        email: req.body.user_email,
        password: req.body.user_password,
        looged_in: false,
        veryfied: false,
        questions_answered: 0,
        rooms: []
    });

    let email_found = true;
    let username_found = true;

    User.findOne({ email: req.body.user_email }, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            if (data == null) {
                email_found = !email_found;
            } else {
                alert = "Email Found";
                return res.render('register', { alert: alert, current_user_name: current_user.name });
            }
        }
    });
    User.findOne({ name: req.body.user_name }, (error, data) => {
        if (error) {
            console.log(error);
        } else {
            if (data == null) {
                username_found = false;
            } else {
                alert = "Username Found";
                return res.render('register', { alert: alert, current_user_name: current_user.name });
            }
        }
    });
    // Verzögere die folgende Methode, da aufgrund der Callbackfunktion in den findOne Methoden sonst die Werte nicht korrekt überprüft werden
    setTimeout(() => {
        if (!email_found && !username_found) {
            user.save();
            res.render('login', { alert: alert, current_user_name: current_user.name });
        }
    }, 1000);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

// Vorerst wurden die JS Dateien aufgeteilt in einen Backend und Frontend Teil...