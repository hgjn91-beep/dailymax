const { contextBridge, ipcRenderer } = require('electron')

// ─── Expose safe IPC API to renderer ─────────────────────────────────────────
contextBridge.exposeInMainWorld('electronAPI', {
  // Window controls
  closeWindow:    ()        => ipcRenderer.send('window-close'),
  minimizeWindow: ()        => ipcRenderer.send('window-minimize'),
  togglePin:      (pin)     => ipcRenderer.send('window-toggle-pin', pin),
  setOpacity:     (value)   => ipcRenderer.send('set-opacity', value),

  // Persistent store
  storeGet:    (key)         => ipcRenderer.invoke('store-get', key),
  storeSet:    (key, value)  => ipcRenderer.invoke('store-set', key, value),
  storeGetAll: ()            => ipcRenderer.invoke('store-get-all'),
})
