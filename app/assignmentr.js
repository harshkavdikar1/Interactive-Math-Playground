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
    for (var key in assignment['grade1'])
    {

      //  console.log(assignment['grade1'][i].question)
        var node_row = document.createElement("TR");
        node_row.setAttribute("id","closed");
        var node_question = document.createElement("TD");
        var node_link = document.createElement("A");
        node_link.setAttribute("href","#")
        var textnode_question= document.createTextNode(key);
        node_link.appendChild(textnode_question)
        node_question.appendChild(node_link);
        node_row.appendChild(node_question);

        if(node_row==null)
        {
          console.log('true')
        }

        table.appendChild(node_row);

    }
    for(var i=0; i<table.rows.length;i++)
    {


      table.rows[i].onclick = function()
      {
        if(this.id == "closed")
        {
          let data1 = fs.readFileSync('db_json/assignment_info.json');
          let assignment1 = JSON.parse(data1);

          console.log(this.rowIndex)
          key = this.cells[0].childNodes[0].childNodes[0];
          console.log(key.wholeText);
          //key = key.slice(1,key.length-1)
          var questions = assignment1['grade1'][key.wholeText];
          var orderedList = document.createElement("OL");
          for(var i=0; i<questions.length; i++)
          {
            var question_node = document.createElement("LI");
            question_node.appendChild(document.createTextNode(questions[i].question));

            //var listoption1 = document.createElement("LI");
            var radio_node1 = document.createElement("INPUT");
            radio_node1.setAttribute("type","radio");
            radio_node1.setAttribute("name","options");
            radio_node1.setAttribute("value","A");


            var radio_node2 = document.createElement("INPUT");
            radio_node2.setAttribute("type","radio");
            radio_node2.setAttribute("name","options");
            radio_node2.setAttribute("value","B");

            var radio_node3 = document.createElement("INPUT");
            radio_node3.setAttribute("type","radio");
            radio_node3.setAttribute("name","options");
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
          this.appendChild(orderedList);
          this.id = "opened";
        }

        else {
          var rowchildren = this.childNodes
          this.removeChild(rowchildren[1]);
          this.id = "closed";
        }

      }


    }
}

/*function viewAssignment(e){
console.log(this.rowIndex+1);
}*/
