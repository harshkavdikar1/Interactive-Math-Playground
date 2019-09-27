const electron=require('electron')
const browser_window=electron.remote.BrowserWindow
const ipc=electron.ipcRenderer

const submit_btn=document.getElementById('submit')
const email_txt=document.getElementById('email_id')
const password_txt=document.getElementById('password')

submit_btn.addEventListener('click',function(event)
{
	console.log("hi rend")
	ipc.send('sent_credentials',email_txt.value,password_txt.value)

})