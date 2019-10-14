  const electron=require('electron')
  const ipc=electron.ipcRenderer
  const BrowserWindow = electron.remote.BrowserWindow;
  let win

  const name=document.getElementById('name')
  const email=document.getElementById('email')
  const age=document.getElementById('age')
  const password=document.getElementById('pwd')
  const account_type = document.getElementById('type')

  const submit_button=document.getElementById('submit')

  submit_button.addEventListener('click',function(event)
  {

    console.log("hi")
  	ipc.send('signup_credentials',name.value,email.value,age.value,password.value)


    if(name != null && email != null && password != null){

      win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          nodeIntegration: true
        }
      })
      // and load the login.html of the app.
      win.loadURL('file://'+__dirname+'/home.html')
      // Open the DevTools.
      win.webContents.openDevTools()
      // Emitted when the window is closed.
      win.on('closed', () => {
        win = null
      })

    }



  })
