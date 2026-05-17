const { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage, screen } = require('electron')
const path = require('path')
const Store = require('electron-store')

// ─── Persistent Config ────────────────────────────────────────────────────────
const store = new Store({
  defaults: {
    windowBounds: { x: null, y: null, width: 340, height: 560 },
    prayerTimes: {
      fajr:  { start: '05:00', end: '12:00' },
      dhuhr: { start: '12:00', end: '15:30' },
      asr:   { start: '15:30', end: '18:30' },
      isha:  { start: '18:30', end: '05:00' },
    },
    tasks: {},
    opacity: 0.92,
  },
})

// ─── Globals ──────────────────────────────────────────────────────────────────
let mainWindow = null
let tray = null
const isDev = process.env.DEV_MODE === 'true'

// ─── Window Factory ───────────────────────────────────────────────────────────
function createWindow() {
  const { width: screenW, height: screenH } = screen.getPrimaryDisplay().workAreaSize
  const saved = store.get('windowBounds')

  // Default position: bottom-right corner with margin
  const defaultX = screenW - saved.width - 24
  const defaultY = screenH - saved.height - 24
  const x = saved.x !== null ? saved.x : defaultX
  const y = saved.y !== null ? saved.y : defaultY

  mainWindow = new BrowserWindow({
    x,
    y,
    width: saved.width,
    height: saved.height,
    minWidth: 300,
    minHeight: 400,
    maxWidth: 480,
    maxHeight: 760,

    // ── Overlay behaviors ──────────────────────────────────
    frame: false,           // No native title bar or borders
    transparent: true,      // Enable CSS glass effect
    hasShadow: true,        // Subtle OS shadow
    resizable: true,
    movable: true,

    // ── Always-on-top: 'screen-saver' level beats games & full-screen apps
    alwaysOnTop: true,

    // ── Security ───────────────────────────────────────────
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },

    // ── Icon ───────────────────────────────────────────────
    icon: path.join(__dirname, '../public/icon.ico'),

    // ── Prevent taskbar icon (it's a widget)
    skipTaskbar: false,
    show: false,
  })

  // Set above screen saver level after creation for maximum elevation
  mainWindow.setAlwaysOnTop(true, 'screen-saver', 1)
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true })

  // ── Load app ──────────────────────────────────────────────────────────────
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    // Uncomment to debug: mainWindow.webContents.openDevTools({ mode: 'detach' })
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  // ── Show once ready (prevents white flash) ────────────────────────────────
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // ── Persist window position ───────────────────────────────────────────────
  mainWindow.on('moved', saveBounds)
  mainWindow.on('resized', saveBounds)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

function saveBounds() {
  if (!mainWindow) return
  const bounds = mainWindow.getBounds()
  store.set('windowBounds', bounds)
}

// ─── System Tray ──────────────────────────────────────────────────────────────
function createTray() {
  const iconPath = path.join(__dirname, '../public/logo.png')
  const icon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 })

  tray = new Tray(icon)
  tray.setToolTip('DailyMax')

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show DailyMax',
      click: () => {
        if (mainWindow) {
          mainWindow.show()
          mainWindow.focus()
        } else {
          createWindow()
        }
      },
    },
    {
      label: 'Hide',
      click: () => mainWindow && mainWindow.hide(),
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.isQuiting = true
        app.quit()
      },
    },
  ])

  tray.setContextMenu(contextMenu)
  tray.on('double-click', () => {
    if (mainWindow) {
      mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
    }
  })
}

// ─── IPC Handlers ─────────────────────────────────────────────────────────────

// Window controls
ipcMain.on('window-close', () => app.isQuiting ? app.quit() : mainWindow?.hide())
ipcMain.on('window-minimize', () => mainWindow?.minimize())
ipcMain.on('window-toggle-pin', (_, pin) => {
  if (!mainWindow) return
  mainWindow.setAlwaysOnTop(pin, 'screen-saver', 1)
})

// Custom drag (move window from renderer-side mouse events)
ipcMain.on('window-move-start', () => {
  // Handled via -webkit-app-region: drag in CSS
})

// Store access
ipcMain.handle('store-get', (_, key) => store.get(key))
ipcMain.handle('store-set', (_, key, value) => {
  store.set(key, value)
  return true
})
ipcMain.handle('store-get-all', () => store.store)

// Opacity
ipcMain.on('set-opacity', (_, value) => {
  if (mainWindow) mainWindow.setOpacity(value)
  store.set('opacity', value)
})

// ─── App Lifecycle ────────────────────────────────────────────────────────────
app.whenReady().then(() => {
  createWindow()
  createTray()

  // Restore opacity
  const opacity = store.get('opacity')
  if (mainWindow) mainWindow.setOpacity(opacity)
})

app.on('window-all-closed', (e) => {
  // Keep app alive in tray (Windows behavior)
  e.preventDefault()
})

app.on('activate', () => {
  if (!mainWindow) createWindow()
})

app.on('before-quit', () => {
  app.isQuiting = true
})
