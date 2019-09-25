const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function createWindow() {
   win = new BrowserWindow({width: 1000, height: 800})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'app/index.html'),
      protocol: 'file:',
      slashes: true
   }))
 }

app.on('ready', createWindow);

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
