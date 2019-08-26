ipcRenderer.on('action', (event, payload) => {
  switch(payload) {
    case 'exiting':
      askSaveIfNeed();
      break;
  }
});

function askSaveIfNeed() {
  if (_via_should_ask_save) {
    const response = dialog.showMessageBoxSync(remote.getCurrentWindow(), {
      message: 'Save XML?',
      type: 'question',
      buttons: ['Yes', 'No', 'Cancel']
    });
    if (response === 2) return;
    if (response === 0) download_all_region_data('xml');
  }
  
  ipcRenderer.sendSync('reqaction', 'exit');
}

/**
 * 方案二：
 */
window.addEventListener('beforeunload', (ev) => {
  if (_via_should_ask_save) {
    const response = dialog.showMessageBoxSync(remote.getCurrentWindow(), {
      message: 'Save XML?',
      type: 'question',
      buttons: ['Yes', 'No', 'Cancel']
    });
    if (response === 2) ev.returnValue = true;
    if (response === 0) download_all_region_data('xml');
  }
});
