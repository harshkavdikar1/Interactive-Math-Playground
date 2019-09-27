const electron=require('electron')
const ipc1=electron.ipcRenderer

console.log("hello")
var para=document.getElementById('para')

ipc1.send('ping')

ipc1.on('sent_user_name',function(event,arg){

	para.innerHTML=arg.toLocaleString('en');
	console.log('hi');
})