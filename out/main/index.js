"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const icon = path.join(__dirname, "../../resources/icon.png");
electron.ipcMain.on("quit", () => {
  const template = [
    {
      label: "退出",
      click: () => {
        electron.app.quit();
      }
    }
  ];
  const menu = electron.Menu.buildFromTemplate(template);
  menu.popup();
});
electron.ipcMain.handle("drag", (e, opt) => {
  const win = electron.BrowserWindow.fromWebContents(e.sender);
  const [x, y] = win.getPosition();
  win.setPosition(x + opt.x, y + opt.y);
});
const createTray = () => {
  let tray = null;
  tray = new electron.Tray(
    path.resolve(
      __dirname,
      process.platform === "darwin" ? "../../resources/trayTemplate@2x.png" : "../../resources/windowTray.png"
    )
  );
  const contextMenu = electron.Menu.buildFromTemplate([{ label: "退出", role: "quit" }]);
  tray.setToolTip("This is my application.");
  tray.setContextMenu(contextMenu);
};
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 300,
    height: 300,
    minWidth: 250,
    minHeight: 250,
    maxHeight: 500,
    maxWidth: 500,
    show: false,
    x: 1500,
    y: 200,
    frame: false,
    transparent: true,
    acceptFirstMouse: true,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });
  mainWindow.setAspectRatio(1);
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev)
    mainWindow.webContents.openDevTools();
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  createWindow();
  createTray();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
