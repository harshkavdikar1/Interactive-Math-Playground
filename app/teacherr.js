// Author: Sarvansh Parsher, Rohith Gaddam, Snehith Karna
// Date: 11/12/2019

const electron = require('electron')
const ipc = electron.ipcRenderer
const ipcMain = electron.remote.ipcMain;
const fs = require('fs')

ipc.send('ping')
var user_name
var id = 1
//recieving data from main process
ipc.on('sent_user_name',function(event,arg){
  user_name = arg;
	//para.innerHTML = arg.toLocaleString('en');
	console.log('hi');
})

var para = document.getElementById('TeacherName');
var assignment = document.getElementById("Assignment");
document.getElementById("add_assignment").addEventListener('click',addAssignment);
document.getElementById("add_question").addEventListener('click',addQuestion);

function addQuestion()
{
  id++;
  console.log(id)
  var division = document.createElement("div");
  division.setAttribute("id",'question'+id);

  var textbox = document.createElement("textarea");
  textbox.setAttribute("id","assignment_text")
  textbox.setAttribute("class","input border")
  textbox.setAttribute("rows",6)
  textbox.setAttribute("cols",40)

  var option1 = document.createElement("input");
  option1.setAttribute("type","text")
  option1.setAttribute("placeholder","option1")
  option1.setAttribute("id","option1")

  var option2 = document.createElement("input");
  option2.setAttribute("type","text")
  option2.setAttribute("placeholder","option2")
  option2.setAttribute("id","option2")

  var option3 = document.createElement("input");
  option3.setAttribute("type","text")
  option3.setAttribute("placeholder","option3")
  option3.setAttribute("id","option3")

  var remove_button = document.createElement('button')
  remove_button.setAttribute("id",id)
  remove_button.setAttribute("class","RemoveButton")
  remove_button.setAttribute("onclick","removeQuestion('\'+id+'\')")
  var textnode = document.createTextNode("X")
  remove_button.appendChild(textnode)

  var linebreak = document.createElement("br")
  var answer = document.createElement("input");
  answer.setAttribute("type","text");
  answer.setAttribute("placeholder","answer option");
  answer.setAttribute("id","answer");

  division.appendChild(textbox);
  division.appendChild(option1);
  division.appendChild(document.createElement("br"));
  division.appendChild(option2);
  division.appendChild(document.createElement("br"));
  division.appendChild(option3);
  division.appendChild(document.createElement("br"));
  division.appendChild(answer);
  division.appendChild(remove_button);
  division.childNodes[8].onclick = function()
  {
    this.parentNode.parentNode.removeChild(this.parentNode.previousSibling);
    this.parentNode.parentNode.removeChild(this.parentNode);
  }
  assignment.appendChild(linebreak);
  assignment.appendChild(division);
}

function addAssignment(event){

  var children = assignment.childNodes;
  console.log(children.length);

  var grade = document.getElementById("grade").value;
  var assignment_name = document.getElementById("AssignmentName").value;

  let data = fs.readFileSync('db_json/assignment_info.json');
  let assignment_data = JSON.parse(data);

  var assignment_array = [];

  for(i=0; i<children.length;i++)
  {
    if(children[i].nodeName=="DIV")
    {
      //console.log(children[i].childNodes.length);
      question_array={};
      for(j=0; j<children[i].childNodes.length;j++)
      {
        if(children[i].childNodes[j].id=="assignment_text"){
             console.log(children[i].childNodes[j].value);
             question_array['question'] = children[i].childNodes[j].value;
        }
        else if (children[i].childNodes[j].id=="option1") {
            question_array['option1'] = children[i].childNodes[j].value;
        }
        else if (children[i].childNodes[j].id=="option2") {
            question_array['option2'] = children[i].childNodes[j].value;
        }
        else if (children[i].childNodes[j].id=="option3") {
            question_array['option3'] = children[i].childNodes[j].value;
        }
        else if(children[i].childNodes[j].id=="answer"){
            question_array['answer'] = children[i].childNodes[j].value;
        }
      }
      assignment_array.push(question_array);
    }
  }
  assignment_data[grade][assignment_name]=assignment_array;
  fs.writeFileSync("db_json/assignment_info.json", JSON.stringify(assignment_data, null, 4), (err) => {
   if (err) {
      console.error(err);
      return;
   };
  });
  var length= children.length;
  var divelements = 0;
  for(i=0; i<length; i++)
  {
    console.log(children[i].nodeName);
    if(divelements>0)
    {
      assignment.removeChild(children[i]);
    }
    if(divelements==0){
      if(children[i].nodeName=="DIV")
      {
        divelements++;
      }
    }

  }
  alert("assignment sucessfully added");
}

function logOut(event){
  location.href = "login.html";
}
