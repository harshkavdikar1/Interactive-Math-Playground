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
    for (var i = assignment['grade1'].length-1; i >= 0 ; i--)
    {

        console.log(assignment['grade1'][i].question)
        var node_row = document.createElement("TR");

        var node_question = document.createElement("TD");
        var textnode_question= document.createTextNode(assignment['grade1'][i].question);
        node_question.appendChild(textnode_question);
        node_row.appendChild(node_question);
        if(node_row==null)
        {
          console.log('true')
        }


        table.appendChild(node_row);


    }
}
