import { BrowserWindow, ipcMain, IpcMainInvokeEvent } from 'electron'

ipcMain.handle('drag', (e: IpcMainInvokeEvent, opt: { x: number; y: number }) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const win = BrowserWindow.fromWebContents(e.sender)!
  const [x, y] = win.getPosition()
  win.setPosition(x + opt.x, y + opt.y)
})
