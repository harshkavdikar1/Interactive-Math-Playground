const { app, BrowserWindow } = require('electron')
const ipc=require('electron').ipcMain
const {webContents}=require('electron')

//const sqlite=require(sqlite3)

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win 
let user
let logged=0
let win1

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('login.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
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
ipc.on('sent_credentials',function(event,arg1,arg2){
  console.log(arg1)
  console.log(arg2)
  user=arg1
  console.log(user)

  logged=1
  win.loadFile('home.html')
})

ipc.on('ping',function(event){
    console.log('pinged')
    if(logged===1)
   {
     console.log(logged)
     //win.webContents.send('user_name',user)

     win.webContents.send('sent_user_name',user)

    }
})



// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.