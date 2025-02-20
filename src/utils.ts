function openTab(url: string) {
  chrome.tabs.create({ url })
}

function openExtTab(id: string) {
  openTab(`./tabs/${id}.html`)
}

export { openTab, openExtTab }
