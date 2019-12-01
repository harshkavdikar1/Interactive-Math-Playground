// Author : Rohith Gaddam, Sarvansh Parsher
// Date : 11/11/2019

const electron = require('electron');
const ipc = electron.ipcRenderer;
const fs = require('fs');

var table = document.getElementById("AssignmentTable")
ipc.send('assignmentping')
var user_name
ipc.on('sent_assignment_user_name', function(event, arg){
   user_name = arg;
   console.log(user_name);
   createTable();
})

function createTable()
{

    let data = fs.readFileSync('db_json/assignment_info.json');
    let assignment = JSON.parse(data);
    var grades = fs.readFileSync('db_json/grades_info.json');
    grades = JSON.parse(grades);

    for (var key in assignment['grade1'])
    {

      //  console.log(assignment['grade1'][i].question)
        var node_row = document.createElement("TR");
        var node_question = document.createElement("TD");
        node_question.setAttribute("id","closed");
        var node_link = document.createElement("A");
        node_link.setAttribute("href","#");
        var textnode_question= document.createTextNode(key);
        node_link.appendChild(textnode_question);
        node_question.appendChild(node_link);
        if(grades[user_name]!=null)
        {
          if(grades[user_name][key]!=null){
            var score_text = document.createTextNode("score:"+grades[user_name][key]);
            node_question.append(document.createElement("BR"));
            node_question.appendChild(score_text);
          }
        }
        node_row.appendChild(node_question);

        if(node_row==null)
        {
          console.log('true')
        }

        table.appendChild(node_row);

    }
    for(var i=0; i<table.rows.length;i++)
    {

      //Function for dispalying questions******************************
      table.rows[i].cells[0].onclick = function()
      {
        console.log("111");
        if(this.id == "closed")
        {
          let data1 = fs.readFileSync('db_json/assignment_info.json');
          let assignment1 = JSON.parse(data1);
          //console.log(this.rowIndex)
          key = this.childNodes[0].childNodes[0];
          console.log(key.wholeText);
          //key = key.slice(1,key.length-1)
          var questions = assignment1['grade1'][key.wholeText];
          var orderedList = document.createElement("OL");

          for(var i=0; i<questions.length; i++)
          {
            var question_node = document.createElement("LI");
            question_node.appendChild(document.createTextNode(questions[i].question));

            var radio_node1 = document.createElement("INPUT");
            radio_node1.setAttribute("type","radio");
            radio_node1.setAttribute("name","options"+i);
            radio_node1.setAttribute("value","A");


            var radio_node2 = document.createElement("INPUT");
            radio_node2.setAttribute("type","radio");
            radio_node2.setAttribute("name","options"+i);
            radio_node2.setAttribute("value","B");

            var radio_node3 = document.createElement("INPUT");
            radio_node3.setAttribute("type","radio");
            radio_node3.setAttribute("name","options"+i);
            radio_node3.setAttribute("value","C");

            question_node.appendChild(document.createElement("BR"));
            question_node.appendChild(radio_node1);
            question_node.appendChild(document.createTextNode(questions[i].option1));
            question_node.appendChild(document.createElement("BR"));
            question_node.appendChild(radio_node2);
            question_node.appendChild(document.createTextNode(questions[i].option2));
            question_node.appendChild(document.createElement("BR"));
            question_node.appendChild(radio_node3);
            question_node.appendChild(document.createTextNode(questions[i].option3));
            orderedList.appendChild(question_node);
          }

          this.id = "opened";
          submit_btn = document.createElement("button");
          btn_text = document.createTextNode("Submit");
          submit_btn.appendChild(btn_text);
          orderedList.appendChild(submit_btn);
          this.parentNode.appendChild(orderedList);
          var col_children = this.parentNode.childNodes[1].childNodes;

          //function for submitting***************************
          col_children[col_children.length-1].onclick = function()
          {
            console.log(this.parentNode);
            var question_list = this.parentNode;
            var row = question_list.parentNode;
            var assignment_name = row.cells[0].childNodes[0].childNodes[0].wholeText;
            var data = fs.readFileSync('db_json/assignment_info.json');
            var assignment = JSON.parse(data);
            var score = 0;
            for(var k=0; k<assignment['grade1'][assignment_name].length; k++)
            {
              var options = document.getElementsByName('options'+k);
              var answer
              for(i = 0; i < options.length; i++)
              {
                if(options[i].checked)
                  answer = options[i].value;
              }
              if(answer.toLowerCase() == assignment['grade1'][assignment_name][k].answer.toLowerCase())
                  score = score+1;
              console.log("question"+(k+1)+" your answer:"+answer);
              console.log("correct answer:"+assignment['grade1'][assignment_name][k].answer);
            }
            alert("your score is:"+score);
            var grades = fs.readFileSync('db_json/grades_info.json');
            grades = JSON.parse(grades);
            if(grades[user_name] == null)
            {
              grades[user_name] = {}
              grades[user_name][assignment_name]=score;
              row.cells[0].appendChild(document.createElement("BR"));
              row.cells[0].appendChild(document.createTextNode("score:"+score));
            }
            else if(grades[user_name][assignment_name]==null)
            {
              grades[user_name][assignment_name]=score;
              row.cells[0].appendChild(document.createElement("BR"));
              row.cells[0].appendChild(document.createTextNode("score:"+score));
            }
            fs.writeFileSync("db_json/grades_info.json", JSON.stringify(grades, null, 4), (err) => {
             if (err) {
                console.error(err);
                return;
             };
            });
          }
          //function submitting answers ends here*********************
        }

        else {
          var rowchildren = this.parentNode.childNodes;
          this.parentNode.removeChild(rowchildren[1]);
          this.id = "closed";
        }

      }
      //dispalying questionn function ends here***************************************


    }
}
