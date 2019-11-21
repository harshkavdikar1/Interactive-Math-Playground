const electron = require('electron')
const ipc = electron.ipcRenderer
const ipcMain = electron.remote.ipcMain;
const fs = require('fs')

ipc.send('ping')
var user_name
//recieving data from main process
ipc.on('sent_user_name',function(event,arg){
  user_name = arg;
	//para.innerHTML = arg.toLocaleString('en');
	console.log('hi');
})

var para = document.getElementById('TeacherName')

document.getElementById("add_assignment").addEventListener('click',addAssignment);

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


function logOut(event){
  location.href = "login.html";
}
