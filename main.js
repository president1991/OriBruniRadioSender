console.log('main process working');

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path= require("path");
const url = require("url");
const ipc = electron.ipcMain;
const { dialog } = require('electron');
const fs = require('fs');
const {ipcMain} = require('electron-better-ipc');

var win;

// File di configurazione
if(fs.existsSync("./config/config-runtime.js")){
    global.settings = JSON.parse(fs.readFileSync("./config/config-runtime.js", 'utf8'))
    fs.unlinkSync("./config/config-runtime.js")
  } else {
    global.settings = JSON.parse(fs.readFileSync("./config/config.js", 'utf8'))
  }
  
  console.log(settings.default_server_port)


function saveSettings(settings_value){
    console.log("save settings")
  
    for(var i=0; i < settings_value.length; i++){
      //console.log(settings_value[i].id + " : " + settings_value[i].value)
      if(settings_value[i].value!="")
        settings[settings_value[i].id] = settings_value[i].value
    }
  
    console.log(settings)
    ipcRenderer.send('save-settings', settings)
  }

  ipcMain.on("save-settings", (event, settings) => {
    console.log("new settings")
    global.settings = settings
    var jsonContent = JSON.stringify(settings);
    fs.writeFile("./config/config-runtime.js", jsonContent, 'utf8', (err)=>{
      console.log(err)
    })
    fs.writeFile("./config/config.js", jsonContent, 'utf8', (err)=>{
      console.log(err)
    })
  })
//------------------------------------

function createWindow() {
    win = new BrowserWindow({
        webPreferences: { nodeIntegration: true  },
        icon: path.join(__dirname, './images/oribruni_radiosender.ico'),
        minHeight: 850,
        minWidth: 800
    }); 
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));

    win.webContents.openDevTools();
    win.maximize();
    
    win.on('closed', () => {
        win = null;
    })

}

ipc.on('async-message', function(event){
    event.sender.send('async-reply', 'Main process opened the error dialog');
});

ipc.on('sync-message', function(event){
    event.returnValue = 'sync-reply';    
});

process.on('uncaughtException', function (err) {
  console.log(err);
})


app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
    {
        app.quit()
    }
})


//only for MAC
app.on('activate', () =>{
    if (win === null) {
        createWindow()
    }
})
 

var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};