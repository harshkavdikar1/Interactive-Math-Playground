const electron = require('electron')
const ipc = electron.ipcRenderer
const submit_btn = document.getElementById('submit')
const name = document.getElementById('name')
const age = document.getElementById('age')
const email = document.getElementById('email_id')
const password = document.getElementById('password')


submit_btn.addEventListener('click',function(event)
{
	//sending data to main process.
	if (email.value != '' && password.value != ''){
		ipc.send('login_credentials',email.value,password.value)
	}
	else if (name.value == '' || age.value == '') {
		alert('Please Enter Name and Age or Email and Password to login');
	}
	else if (age.value < 8) {
		location.href = "home.html";
	}
	else if (age.value < 12) {
		location.href = "home2.html";
	}
	else {
		location.href = "home3.html";
	}
	location.href = "login.html"
})

function takeToSignUp(){
	location.href = "signup.html";
}
