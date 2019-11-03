  const electron = require('electron')
  const ipc = electron.ipcRenderer
  const BrowserWindow = electron.remote.BrowserWindow;
  let win

  const name = document.getElementById('name')
  const email = document.getElementById('email')
  const age = document.getElementById('age')
  const password = document.getElementById('pwd')
  const confirm_pwd = document.getElementById('confirm_pwd')

  const submit_button=document.getElementById('submit')

  submit_button.addEventListener('click',function(event)
  {
    if (password.value == confirm_pwd.value){

      var account_type = document.querySelector('input[name="type"]:checked').value;

    	ipc.send('signup_credentials', name.value, email.value, age.value, password.value, account_type);

      location.href = "login.html";

    }
    else {

      alert('Passwords doesnot match');

    }
  })


  document.getElementById('cancel').addEventListener('click',function(event){
    location.href = "login.html";
  })
