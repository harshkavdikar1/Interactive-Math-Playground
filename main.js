
const { app, BrowserWindow } = require('electron')
const ipc=require('electron').ipcMain
const {webContents}=require('electron')


let win 
let user_name
let logged=0


function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // and load the login.html of the app.
  win.loadURL('file://'+__dirname+'/app/login.html')
  // Open the DevTools.
  win.webContents.openDevTools()
  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })
}




app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

//receiving data from loginr.js
ipc.on('sent_credentials',function(event,arg1,arg2){ 
  console.log(arg1)
  console.log(arg2)
  user_name=arg1
  console.log(user_name)
  
//logged will be 1 when typed credentials are correct.
//database operations for login are to be done here.
  logged=1

  if(logged==1)//checking whether user logged in or not.
  {
     win.loadURL('file://'+__dirname+'/app/home.html')// if logged==1, go to homepage(load homepage in window)
  }

})

//receiving signal from home.js
ipc.on('ping',function(event){
     console.log('pinged')
     console.log(logged)
     
     // sending data to home.js
     win.webContents.send('sent_user_name',user_name)

})



