const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow;
const math = require('mathjs')
const ipc = electron.ipcRenderer
let history_win
//console.log("hello")
//var para = document.getElementById('para')

//sending signal to main process to get connection
ipc.send('ping')

//recieving data from main process
ipc.once('sent_user_name',function(event,arg){

	//para.innerHTML = arg.toLocaleString('en');
	console.log('hi');
})

var next_operator_id = 10;
var next_operand_id = 4;

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

        numberDiv.setAttribute("id", next_operator_id);
        numberDiv.setAttribute("draggable", "true");
				numberDiv.setAttribute("class", "operands");

        var span = document.createElement("span");
        span.setAttribute("id", "operandText");
        span.appendChild(document.createTextNode(i));

        numberDiv.appendChild(span);

        numberDoc.appendChild(numberDiv);

				next_operator_id = next_operator_id + 1;
    }
    oprandWrapper.appendChild(numberDoc);
}

function recreateOperators() {

    var operatorWrapper = document.getElementById("optorWrapper");
    operatorWrapper.innerHTML = "";
    var numberDoc = document.createDocumentFragment();
		operands = ['+','-','*','/'];

    for (var i = 0; i < operands.length; i++) {
        var numberDiv = document.createElement("div");

        numberDiv.setAttribute("id", next_operator_id);
        numberDiv.setAttribute("draggable", "true");
				numberDiv.setAttribute("class", "operator");

        var span = document.createElement("span");
        span.setAttribute("id", "operatorText");
        span.appendChild(document.createTextNode(operands[i]));

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
	document.getElementById("display_result").value = math.evaluate(answer);
}

document.getElementById("clear").addEventListener('click',clear);

function clear(event)
{
	d = document.getElementById("playground1");
	d.innerHTML = "";
	document.getElementById("display_result").value = "";
}

/*history = document.getElementById("historyLink");
if(history){
history.addEventListener('click',viewHistory);
}*/

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
	// Open the DevTools.
	history_win.webContents.openDevTools()
	// Emitted when the window is closed.
	history_win.on('closed', () => {
		history_win = null
	})
	//console.log("history request");
}
