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
    let answers_txt_indx = 1;
    s += "<hr><input type='text' name='room_name' id='room_name' placeholder='Room Name'><br>";
    s += "<input type='password' name='room_password' id='room_password' placeholder='Room Password'><hr>"
    obj.questions.forEach(element => {
        answers_txt_indx = 1;
        s += "<h3>" + element.question + "</h3>"; // Heading
        s += "<textarea name='q_" + v + "' id='question_text_" + v + "' cols='100' rows='1' placeholder='Question'></textarea>"; // Question
        element.answers.forEach(answer => {
            s += "<textarea name='q_" + v + "_a_" + answers_txt_indx + "' id='answer_text_ " + answers_txt_indx + "' cols='100' rows='1' placeholder='Answeroption'></textarea>";
            answers_txt_indx++;
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
    s += "<button type='button' class='btn btn-success' onClick='add_question()'>Add Question</button>";
    if (obj.questions.length > 3) {
        s += "<button class='btn btn-danger' type='button' onClick='remove_question()'>Remove Question</button><hr><button class='btn btn-success'>Create Room</button></hr>";
    } else {
        s += "<button class='btn btn-danger' type='button' onClick='remove_question()' disabled>Remove Question</button><hr><button class='btn btn-success'>Create Room</button></hr>";
    }
    return s;
}

document.getElementById("form-content").innerHTML = form_obj_to_html(form_obj);

let add_answer = function(id) {
    index = parseInt(id.substring(6));
    let x = "Answer " + (parseInt(form_obj.questions[index - 1].answers.length) + 1);
    form_obj.questions[index - 1].answers.push(x);
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

let remove_question = function() {
    form_obj.questions.pop();
    document.getElementById("form-content").innerHTML = form_obj_to_html(form_obj);
}