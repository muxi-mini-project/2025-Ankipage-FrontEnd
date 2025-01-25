document.addEventListener('DOMContentLoaded', () => {
    const moreButton = document.getElementById('moreButton');
    moreButton.addEventListener('click', async () => {
        try {
            console.log('More button clicked');
            const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const tabId = currentTab.id;

            console.log('Attempting to close side panel with tabId:', tabId);
            // 关闭侧边栏,WHY???
            //await chrome.sidePanel.close({ tabId });你到底有什么问题？为啥这行注释掉就能用了？
            console.log('Side panel closed successfully');

            const morePageUrl = chrome.runtime.getURL('more.html');
            console.log('Opening more page with URL:', morePageUrl);
            chrome.tabs.create({ url: morePageUrl });
        } catch (error) {
            console.error('Error closing side panel or opening more page:', error);
        }
    });


    chrome.storage.local.get('notes', (result) => {
        const notes = result.notes || [];
        displayNotes(notes);
    });

    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === 'updateNotes') {
            chrome.storage.local.get('notes', (result) => {
                const notes = result.notes || [];
                displayNotes(notes);
            });
        }
    });
});

function displayNotes(notes) {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';
    notes.forEach((note) => {
        const noteDiv = document.createElement('div');
        noteDiv.style.border = '1px solid #ccc';
        noteDiv.style.padding = '10px';
        noteDiv.style.marginBottom = '10px';
        if (note.tag) {
            const tagSpan = document.createElement('span');
            tagSpan.textContent = `#${note.tag}`;
            tagSpan.style.color = 'purple';
            noteDiv.appendChild(tagSpan);
            noteDiv.appendChild(document.createElement('br'));
        }
        const text = note.text.length > 50? note.text.slice(0, 50) + '...' : note.text;
        noteDiv.innerHTML += `<p>${text}</p>`;
        noteDiv.innerHTML += `<p>Selected Text: ${note.selectedText.slice(0, 50)}...</p>`;
        noteDiv.innerHTML += `<p>URL: <a href="${note.url}" target="_blank">${note.url.slice(0, 50)}...</a></p>`;
        notesContainer.appendChild(noteDiv);
    });
}