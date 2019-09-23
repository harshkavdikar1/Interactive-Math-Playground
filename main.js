const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')

function createWindow() {
   win = new BrowserWindow({width: 1000, height: 800})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'app/index.html'),
      protocol: 'file:',
      slashes: true
   }))
}

app.on('ready', createWindow)
