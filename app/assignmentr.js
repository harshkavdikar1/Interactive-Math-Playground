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
        //node_row.setAttribute("onclick","viewAssignment()");
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
        let data1 = fs.readFileSync('db_json/assignment_info.json');
        let assignment1 = JSON.parse(data1);

        console.log(this.rowIndex)
        key = this.cells[0].childNodes[0].childNodes[0];
        console.log(key.wholeText);
        //key = key.slice(1,key.length-1)
        console.log(assignment1['grade1'][key]);
      }
    }
}

/*function viewAssignment(e){
console.log(this.rowIndex+1);
}*/
