import { app, BrowserWindow, Menu, globalShortcut } from 'electron'
import { join } from 'path'

function createWindow() {
    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    Menu.setApplicationMenu(null);

    // Carrega o aplicativo React
    if (app.isPackaged) {
        // No build de produção
        window.loadFile(join(__dirname, 'dist/index.html'))
    } else {
        // No desenvolvimento
        window.loadURL('http://localhost:5178') // Porta padrão do Vite
        // window.webContents.openDevTools()
    }

    // Registrar atalho F11 para fullscreen
    globalShortcut.register('F11', () => {
        window.setFullScreen(!window.isFullScreen())
    })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

// Limpar os atalhos globais quando o app for fechado
app.on('will-quit', () => {
    globalShortcut.unregisterAll()
})