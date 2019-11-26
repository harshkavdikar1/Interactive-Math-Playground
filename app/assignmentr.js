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
    for (key in assignment['grade1'])
    {
        //console.log(assignment['grade1'][i].question)
        var node_row = document.createElement("TR");
      //  node_row.setAttribute("onclick","viewAssignment()");
        var node_question = document.createElement("TD");
        var node_link = document.createElement("A")
        node_link.setAttribute("href","#");
        var textnode= document.createTextNode(key);
        node_link.appendChild(textnode);
        node_question.appendChild(node_link);
        node_row.appendChild(node_question);
        if(node_row==null)
        {
          console.log('true')
        }
        table.appendChild(node_row);
    }
}

/*function viewAssignment(e){
  console.log("hhh")
  console.log(e.currentTarget.index() + 1);
}*/
