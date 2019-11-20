// Author : Harsh Kavdikar
// Date : 09/14/2019

const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow;
const math = require('mathjs')
const ipc = electron.ipcRenderer
const fs = require('fs')
const ipcMain = electron.remote.ipcMain;
let history_win
var user_name
let assignment_win
//console.log("hello")
//var para = document.getElementById('para')

ipc.send('ping')

//recieving data from main process
ipc.on('sent_user_name',function(event,arg){
  user_name = arg;
  console.log(user_name)
	//para.innerHTML = arg.toLocaleString('en');
	console.log('hi');
})

var next_operator_id = 120;
var next_operand_id = 10;

const operands_drag = document.querySelectorAll(".operandsWrapper")
const operator_drag = document.querySelectorAll(".operatorWrapper")
const pg_drag = document.querySelector(".playground")


for (const i of operands_drag){
	i.addEventListener('dragstart', dragStart);
}
for (const i of operator_drag){
	i.addEventListener('dragstart', dragStart);
}

pg_drag.addEventListener('dragStart', pgDragStart);
pg_drag.addEventListener('dragover', dragOver);
pg_drag.addEventListener('drop', dragDrop);

function pgDragStart(event) {
	event.preventDefault();
}

function dragOver(event) {
	event.preventDefault();
}

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function dragDrop(event){

    var data = event.dataTransfer.getData("text/plain");
    var element = document.getElementById(data);

		var operator=true

		if(element.parentNode.getAttribute("id")=="oprandWrapper"){
			operator=false
		}

    event.target.appendChild(element);

		if(operator==false){
			recreateOperands();
		}
		else {
			recreateOperators();
		}

		displayResults()
}

function recreateOperands() {

    var oprandWrapper = document.getElementById("oprandWrapper");
    oprandWrapper.innerHTML = "";
    var numberDoc = document.createDocumentFragment();

    for (var i = 0; i < 10; i++) {
        var numberDiv = document.createElement("div");

        numberDiv.setAttribute("id", next_operand_id);
        numberDiv.setAttribute("draggable", "true");
				numberDiv.setAttribute("class", "operands");

        var span = document.createElement("span");
        span.setAttribute("id", "operandText");
        span.appendChild(document.createTextNode(i));

        numberDiv.appendChild(span);

        numberDoc.appendChild(numberDiv);

				next_operand_id = next_operand_id + 1;
    }
    oprandWrapper.appendChild(numberDoc);
}

function recreateOperators() {

    var operatorWrapper = document.getElementById("optorWrapper");
    if (operatorWrapper.childElementCount < 5){
        operators = ['+', '-', '*', '/'];
    }
    else if (operatorWrapper.childElementCount < 9) {
        operators = ['+', '-', '*', '/', '%', '^', '(', ')'];
    }
    else {
        operators = ['+', '-', '*', '/', '%', '^', '(', ')', 'pi', 'e', '!', "sin(", "cos(", "tan(", "cot(", "csc(", "sec(", "log("];
    }
    operatorWrapper.innerHTML = "";
    var numberDoc = document.createDocumentFragment();

    for (var i = 0; i < operators.length; i++) {
        var numberDiv = document.createElement("div");

        numberDiv.setAttribute("id", next_operator_id);
        numberDiv.setAttribute("draggable", "true");
				numberDiv.setAttribute("class", "operator");

        var span = document.createElement("span");
        span.setAttribute("id", "operatorText");
        span.appendChild(document.createTextNode(operators[i]));

        numberDiv.appendChild(span);

        numberDoc.appendChild(numberDiv);

				next_operator_id = next_operator_id + 1;
    }
    operatorWrapper.appendChild(numberDoc);
}

//document.getElementById("get_result").addEventListener('click',displayResults)

function displayResults()
{
	var answer = ''
	d = document.getElementById("playground1");
	// console.log(d);
	var children = d.childNodes;
	children.forEach(function(item){
			answer = answer.concat(item.textContent.trimLeft().trimRight())
	    // console.log(item.textContent.trimLeft().trimRight());
	});
	try{
	   var result = math.evaluate(answer);
	 }
  catch(err){
		result = 'invalid'
	}
	document.getElementById("display_result").value = result;

	let data = fs.readFileSync('db_json/history_info.json');
	let history = JSON.parse(data);
	console.log(history);

	if(history[user_name] == null)
	{
		console.log('no element');
		history[user_name] = [{
													transaction : answer,
													result : result,
													time :  new Date()
												}];
		console.log(history)
	}

	else
	{
		history[user_name].push({transaction : answer, result : result, time : new Date()});
	}

	fs.writeFileSync("db_json/history_info.json", JSON.stringify(history, null, 4), (err) => {
	 if (err) {
			console.error(err);
			return;
	 };
	});

}

document.getElementById("clear").addEventListener('click',clear);

function clear(event)
{
	d = document.getElementById("playground1");
	d.innerHTML = "";
	document.getElementById("display_result").value = "";
}


function viewHistory(event)
{
	history_win = new BrowserWindow({
		width: 700,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	})
	// and load the login.html of the app.
	history_win.loadURL('file://'+__dirname+'/history.html')
	// Emitted when the window is closed.
	history_win.on('closed', () => {
		history_win = null
	})
	//console.log("history request");
}

ipcMain.on('historyping', function(event){
	history_win.webContents.send('sent_history_user_name',user_name)
})


function logOut(event){
  location.href = "login.html";
}

function viewAssignment(event)
{
	assignment_win = new BrowserWindow({
		width: 700,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	})
	// and load the login.html of the app.
	assignment_win.loadURL('file://'+__dirname+'/assignment.html')
	// Emitted when the window is closed.
	assignment_win.on('closed', () => {
		assignment_win = null
	})
	//console.log("history request");
}
ipcMain.on('assignmentping', function(event){
	assignment_win.webContents.send('sent_assignment_user_name',user_name)
})
