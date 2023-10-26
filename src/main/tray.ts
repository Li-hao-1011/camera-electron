import { Menu, Tray } from 'electron'
import path from 'path'

const createTray = () => {
  let tray: Tray | null = null

  tray = new Tray(
    path.resolve(
      __dirname,
      process.platform === 'darwin'
        ? '../../resources/trayTemplate@2x.png'
        : '../../resources/windowTray.png'
    )
  )
  const contextMenu = Menu.buildFromTemplate([{ label: '退出', role: 'quit' }])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
}

export default createTray
