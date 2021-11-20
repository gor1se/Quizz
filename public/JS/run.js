let q_index = 0;

let questions = [
    question_1 = {
        question: "Was ergibt 1+4?",
        answers: ["3", "4", "5", "6"],
        solution: "answer_3",
        points: 1,
        answer_given: 0,
        correct: false
    },
    question_2 = {
        question: "Was ergibt 2+2?",
        answers: ["3", "4", "5", "6"],
        solution: "answer_2",
        points: 1,
        answer_given: 0,
        correct: false
    },
    question_3 = {
        question: "Wie schnell darf man auf deutschen Autobahnen fahren?",
        answers: ["130 km/h", "140 km/h", "150 km/h", "Es gibt kein strenges Tempolimit"],
        solution: "answer_4",
        points: 1,
        answer_given: 0,
        correct: false
    }
];

$("#start").click(function() {
    $("#start").css("display", "none");
    $(".start-text").css("display", "none");
    let string = question_html(questions[q_index]);
    $(".quizz").html(string);
});

function reply_click(clicked_id) {
    // save answer
    if (clicked_id == "answer_1") {
        questions[q_index].answer_given = clicked_id;
    } else if (clicked_id == "answer_2") {
        questions[q_index].answer_given = clicked_id;
    } else if (clicked_id == "answer_3") {
        questions[q_index].answer_given = clicked_id;
    } else if (clicked_id == "answer_4") {
        questions[q_index].answer_given = clicked_id;
    } else if (clicked_id == "answer_5") {
        questions[q_index].answer_given = clicked_id;
    } else if (clicked_id == "answer_6") {
        questions[q_index].answer_given = clicked_id;
    } else {
        questions[q_index].answer_given = null;
    }
    // give next question
    q_index++;
    if (q_index < questions.length) {
        // Quizz läuft noch
        let string = question_html(questions[q_index]);
        $(".quizz").html(string);
    } else {
        // Quizz endet, zeige Endbildschirm
        // Evtl. Funktion auslagern und seperat anzeigen
        let total_points_reached = 0;
        let total_points_possible = 0;
        let total_questions_reached = 0;
        let total_questions_possible = questions.length;
        let percent_reached = 0;
        questions.forEach(element => {
            total_points_possible += element.points;
            if (element.answer_given == element.solution) {
                element.correct = true;
                total_questions_reached++;
                total_points_reached += element.points;
            }
        });
        percent_reached = ((total_points_reached / total_points_possible) * 100).toFixed(2);
        let string = "";
        string += "<h4>" + percent_reached + " / 100 % erreicht</h4>";
        if (percent_reached >= 92) {
            string += "<h4>Note: Sehr Gut! (Bestanden)</h4>";
        } else if (percent_reached >= 81) {
            string += "<h4>Note: Gut! (Bestanden)</h4>";
        } else if (percent_reached >= 67) {
            string += "<h4>Note: Befriedigend! (Bestanden)</h4>";
        } else if (percent_reached >= 50) {
            string += "<h4>Note: Ausreichend! (Bestanden)</h4>";
        } else if (percent_reached >= 30) {
            string += "<h4>Note: Mangelhaft! (Nicht Bestanden)</h4>";
        } else {
            string += "<h4>Note: Ungenügend (Nicht Bestanden)</h4>";
        }
        string += "<p> Sie haben " + total_points_reached + " von " + total_points_possible + " Punkte erreicht!</p>";
        string += "<p> Sie haben " + total_questions_reached + " von " + total_questions_possible + " Fragen richtig beantwortet!</p>";

        $(".quizz").html(string);
    }
}

let question_html = qst => {
    let s = "";
    let answer_id = 1;
    s += "<h4>Frage: ";
    s += qst.question;
    s += "</h4>";
    s += "<br>";
    qst.answers.forEach(element => {
        s += '<button type="button" class="btn btn-outline-success" style="min-width: 400px" id="answer_' + answer_id + '" onClick="reply_click(this.id)">' + element + '</button><br>';
        answer_id++;
    });
    s += "<br>";
    s += '<p>' + (q_index + 1) + '/' + questions.length + '</p>';
    return s;
};