const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';

function createWindow() {
   win = new BrowserWindow({width: 1000, height: 800})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))


function encrypt(text){

  let cipher = crypto.createCipheriv(algorithm,Buffer.from(key),iv);

  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted , cipher.final()]);

  return {iv: iv.toString('hex'),encryptedData:encrypted.toString('hex')};

}


function decrypt(text){

  let iv = Buffer.from(text.iv, 'hex');

  let encryptedText = Buffer.from(text.encryptedData,'hex')

  let decipher = cyrpto.createDecipheriv('aes-256-cbc', Buffer.from(key),iv);

  decrypted = Buffer.concat([decrypted,decipher.final()]);

  return decrypted.toString();
}

var hw = encrypt("sarvanshprasher");
console.log(hw);

console.log(decrypt(hw));





























app.on('ready', createWindow)
