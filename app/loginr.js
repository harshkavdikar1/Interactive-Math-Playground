const electron = require('electron')
const ipc = electron.ipcRenderer
const BrowserWindow = electron.remote.BrowserWindow;
const submit_btn = document.getElementById('submit')
const name = document.getElementById('name')
const age = document.getElementById('age')
const email_txt = document.getElementById('email_id')
const password_txt = document.getElementById('password')


submit_btn.addEventListener('click',function(event)
{
	//sending data to main process.
	ipc.send('sent_credentials',email_txt.value,password_txt.value)

})

function takeToSignUp(){
	location.href = "signup.html"
}
