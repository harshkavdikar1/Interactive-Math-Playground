
  const { app, BrowserWindow } = require('electron')
  const ipc=require('electron').ipcMain
  const {webContents}=require('electron')
  let crypto = require('crypto');
  const algorithm = 'aes-192-cbc';
  const password = 'Password used to generate key';
  const key = crypto.scryptSync(password, 'salt', 24);
  const iv = Buffer.alloc(16, 0);
  let win
  let history_win
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
  ipc.once('ping',function(event){
       console.log('pinged')
       console.log(logged)

       // sending data to home.js
       win.webContents.send('sent_user_name',user_name)

  })

  ipc.on('createhistory',function(event){
    console.log('history');
    app.on('ready', createWindowHistory)

       // sending data to home.js
       //win.webContents.send('sent_user_name',user_name)
  })


  ipc.on('signup_credentials',function(event,name,email,age,pwd){

    // encrypting the data using crypto function in electron
    name = encrypt(name)
    email = encrypt(email)
    age = encrypt(age)
    pwd = encrypt(pwd)

    // constructing an object which will be the information of user
    var fs = require("fs");
    var object = {
        name: name,
        email: email,
        age:age,
        pwd:pwd
    };

    // writing it to json file
    fs.writeFileSync("db_json/login_info.json", JSON.stringify(object, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };

    });


  })



  function encrypt(text){

    let cipher = crypto.createCipheriv(algorithm,Buffer.from(key),iv);

    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted , cipher.final()]);

    return {iv: iv.toString('hex'),encryptedData:encrypted.toString('hex')};

  }


  function decrypt(text){

    let iv = Buffer.from(text.iv, 'hex');

    let encryptedText = Buffer.from(text.encryptedData,'hex')

    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key),iv);

    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted,decipher.final()]);

    return decrypted.toString();
  }
