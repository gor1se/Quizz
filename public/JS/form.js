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
        s += "<br><button type='button' class='btn btn-success' onClick='add_answer(this.id)' id='input_" + v + "'>+</button>";
        if (element.answers.length > 2) {
            s += "<button type='button' class='btn btn-danger' onClick='remove_answer(this.id)' id='input_rm_" + v + "'>-</button>";
        } else {
            s += "<button type='button' class='btn btn-danger' disabled onClick='remove_answer(this.id)' id='input_rm_" + v + "'>-</button>";
        }
        s += "<hr>";
        v++;
    });
    s += "<button type='button' class='btn btn-success' onClick='add_question()'>Add Question</button><button class='btn btn-danger'>Remove Question</button><hr><button class='btn btn-success'>Create Room</button></hr>"
    return s;
}

document.getElementById("form-content").innerHTML = form_obj_to_html(form_obj);

let add_answer = function(id) {
    index = parseInt(id.substring(6));
    let x = "Answer " + (parseInt(form_obj.questions[index - 1].answers.length) + 1);
    form_obj.questions[index - 1].answers.push(x);
    // form_obj.questions.answers(index - 1).push("Answer " + form.obj.answers.length);
    document.getElementById("form-content").innerHTML = form_obj_to_html(form_obj);
}

let remove_answer = function(id) {
    index = parseInt(id.substring(9));
    form_obj.questions[index - 1].answers.pop();
    document.getElementById("form-content").innerHTML = form_obj_to_html(form_obj);
}

let add_question = function() {
    let question_count = form_obj.questions.length + 1;
    form_obj.questions.push({
        question: "Question " + question_count,
        answers: ["Answer 1", "Answer 2"]
    });
    document.getElementById("form-content").innerHTML = form_obj_to_html(form_obj);
}