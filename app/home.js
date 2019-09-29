const electron=require('electron')
const ipc1=electron.ipcRenderer

console.log("hello")
var para=document.getElementById('para')

//sending signal to main process to get connection
ipc1.send('ping')

//recieving data from main process
ipc1.on('sent_user_name',function(event,arg){

	para.innerHTML=arg.toLocaleString('en');
	console.log('hi');
})