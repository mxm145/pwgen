const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const ipc = require('electron').ipcMain
const dialog = require('electron').dialog
const fs = require('fs')

const confPath = path.resolve(__dirname, './config.json')

ipc.on('saveConf', function(event, arg){
  let conf = require('./config.json')
  conf.key = arg
  fs.writeFile(confPath, JSON.stringify(conf), 'utf8', (err) => {
      if (err) {
        return
      }
  })
})

ipc.on('getConf', function(event){
  event.returnValue = require(confPath).key
})

ipc.on('open-dialog', function (event, arg) {
  const options = {
    type: 'info',
    title: 'Information',
    message: arg
  }
  dialog.showMessageBox(options)
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 480,
    height: 360,
    title: 'pwgen',
    icon: __dirname + '/pwgen.icns'
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
