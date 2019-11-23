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
  var textnode = document.createTextNode("X")
  remove_button.appendChild(textnode)

  var linebreak = document.createElement("br")

  division.appendChild(textbox);
  division.appendChild(option1);
  division.appendChild(document.createElement("br"));
  division.appendChild(option2);
  division.appendChild(document.createElement("br"));
  division.appendChild(option3);
  division.appendChild(remove_button);
  assignment.appendChild(linebreak);
  assignment.appendChild(division);
}

function addAssignment(event){
  var assignment = document.getElementById("assignment_text").value;

  let data = fs.readFileSync('db_json/assignment_info.json');
  let assignment_data = JSON.parse(data);

  console.log("ass");
  var grade = document.getElementById("grade").value;
  if(assignment != "")
  {
    assignment_data[grade].push({Question : assignment, Contributor : user_name, Time : new Date()});
  }


  fs.writeFileSync("db_json/assignment_info.json", JSON.stringify(assignment_data, null, 4), (err) => {
   if (err) {
      console.error(err);
      return;
   };
  });
}
