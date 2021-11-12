let form_obj = {
    name: "",
    password: "",
    questions: [{
        question: "Question 1",
        answers: ["Answer 1", "Answer 2"]
    }, {
        question: "Question 2",
        answers: ["Answer 1", "Answer 2", "Answer 3"]
    }, {
        question: "Question 3",
        answers: ["Answer 1", "Answer 2"]
    }]
}

let form_obj_to_html = function(obj) {
    let s = "";
    let v = 1;
    s += "<hr><input type='text' name='' id='room_name' placeholder='Room Name'><br>";
    s += "<input type='password' name='' id='room_password' placeholder='Room Password'><hr>"
    obj.questions.forEach(element => {
        s += "<h3>" + element.question + "</h3>"; // Heading
        s += "<textarea name='' id='question_text_" + v + "' cols='100' rows='1' placeholder='Question'></textarea>"; // Question
        element.answers.forEach(answer => {
            s += "<textarea name='' id='answer_text' cols='100' rows='1' placeholder='Answeroption'></textarea>";
        });
        s += "<br><button class='btn btn-success'>+</button><hr>";
        v++;
    });
    s += "<button class='btn btn-success'>Add Question</button><button class='btn btn-danger'>Remove Question</button><hr><button class='btn btn-success'>Create Room</button></hr>"
    return s;
}

document.getElementById("form-content").innerHTML = form_obj_to_html(form_obj);