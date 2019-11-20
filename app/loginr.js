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
	var login = false;
	if (email.value != '' && password.value != ''){
		ipc.send('login_credentials',email.value,password.value)
	}
	else if (name.value == '' || age.value == '') {
		alert('Please Enter Name and Age or Email and Password to login');
		login = true;
	}
	else if (age.value <= 10) {
		location.href = "home_begginer.html";
	}
	else if (age.value <= 14) {
		location.href = "home_intermediate.html";
	}
	else if (age.value > 14){
		location.href = "home.html";
	}
	if (login == true){
		location.href = "login.html";
	}
})

function takeToSignUp(){
	location.href = "signup.html";
}
