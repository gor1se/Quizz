let form_obj = {
    name: "",
    password: "",
    questions: [{
        question: "",
        answers: ["", ""]
    }, {
        question: "",
        answers: ["", "", ""]
    }, {
        question: "",
        answers: ["", ""]
    }]
}

let form_obj_to_html = function(obj) {
    let s = "";
    let v = 1;
    let answers_txt_indx = 1;
    s += "<hr><input type='text' name='room_name' id='room_name' placeholder='Room Name' value='" + obj.name + "'><br>";
    s += "<input type='password' name='room_password' id='room_password' placeholder='Room Password' value='" + obj.password + "'><hr>"
    obj.questions.forEach(element => {
        answers_txt_indx = 1;
        s += "<h3>Question" + v + "</h3>"; // Heading
        s += "<textarea name='q_" + v + "' id='q_" + v + "' cols='100' rows='1' placeholder='Question'>" + element.question + "</textarea>"; // Question
        element.answers.forEach(answer => {
            s += "<textarea name='q_" + v + "_a_" + answers_txt_indx + "' id='q_" + v + "_a_" + answers_txt_indx + "' cols='100' rows='1' placeholder='Answeroption'>" + answer + "</textarea>";
            s += "<input type='checkbox' name='q_" + v + "_a_" + answers_txt_indx + "_c" + "'>"
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
    // Überprüfe die Werte der eingegebenen Felder und speichere sie ab
    save_values();
    index = parseInt(id.substring(6));
    form_obj.questions[index - 1].answers.push("");
    document.getElementById("form-content").innerHTML = form_obj_to_html(form_obj);
    // Set Value am besten in der form_obj_to_html funktion
    document.getElementById("room_name").value = form_obj.name;
}

let remove_answer = function(id) {
    index = parseInt(id.substring(9));
    form_obj.questions[index - 1].answers.pop();
    document.getElementById("form-content").innerHTML = form_obj_to_html(form_obj);
}

let add_question = function() {
    save_values();
    let question_count = form_obj.questions.length + 1;
    form_obj.questions.push({
        question: "",
        answers: ["", ""]
    });
    document.getElementById("form-content").innerHTML = form_obj_to_html(form_obj);
}

let remove_question = function() {
    form_obj.questions.pop();
    document.getElementById("form-content").innerHTML = form_obj_to_html(form_obj);
}

let save_values = function() {
    form_obj.name = document.getElementById("room_name").value;
    form_obj.password = document.getElementById("room_password").value;
    // ID's müssen selbst gebaut werden
    // Für jede Frage speichere die Frage ab 
    let question_count = 1;
    form_obj.questions.forEach(element => {
        element.question = document.getElementById("q_" + question_count).value;
        // Hier folgt nächste forEach um die Antworten zu speichern
        let answer_count = 1;
        element.answers.forEach(answer => {
            answer = document.getElementById("q_" + question_count + "_a_" + answer_count).value;
            element.answers[answer_count - 1] = answer;
            answer_count++;
        });
        question_count++;
    });
}