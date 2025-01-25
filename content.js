const noteIcon = document.createElement('img');
noteIcon.src = chrome.runtime.getURL('images/icon16.png');
noteIcon.style.position = 'absolute';
noteIcon.style.display = 'none';
noteIcon.style.zIndex = '9999';
noteIcon.style.cursor = 'pointer';
document.body.appendChild(noteIcon);

document.addEventListener('selectionchange', () => {
    const selection = window.getSelection();
    if (selection.toString()) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        noteIcon.style.left = rect.right + '5px';
        noteIcon.style.top = rect.top + '5px';
        noteIcon.style.display = 'block';
    } else {
        noteIcon.style.display = 'none';
    }
});

noteIcon.addEventListener('click', () => {
    console.log('make note')
    const selectedText = window.getSelection().toString();
    const url = window.location.href;
    console.log(selectedText + url)
    // BUG，为什么打不开输入框？？？
    openNoteInput(selectedText, url);
});

function openNoteInput(selectedText, url) {
    const noteInputDiv = document.createElement('div');
    noteInputDiv.style.position = 'absolute';
    noteInputDiv.style.backgroundColor = 'white';
    noteInputDiv.style.border = '1px solid #ccc';
    noteInputDiv.style.padding = '10px';
    noteInputDiv.style.zIndex = '9999';
    noteInputDiv.innerHTML = `
        <textarea id="noteInput"></textarea>
        <button id="saveNote">Save</button>
    `;
    document.body.appendChild(noteInputDiv);

    const noteInput = document.getElementById('noteInput');
    const saveButton = document.getElementById('saveNote');

    saveButton.addEventListener('click', () => {
        const noteContent = noteInput.value;
        const { tag, text } = parseNoteContent(noteContent);
        saveNote(selectedText, url, tag, text);
        noteInputDiv.remove();
    });
}

function parseNoteContent(content) {
    const lines = content.split('\n');
    let tag = '';
    let text = '';
    if (lines[0].startsWith('# ')) {
        tag = lines[0].substring(2);
        tag.style.backgroundColor = purple;
        text = lines.slice(1).join('\n');
    } else {
        text = content;
    }
    return { tag, text };
}

function saveNote(selectedText, url, tag, text) {
    chrome.storage.local.get('notes', (result) => {
        const notes = result.notes || [];
        notes.push({ selectedText, url, tag, text });
        chrome.storage.local.set({ notes }, () => {
            chrome.runtime.sendMessage({ action: 'updateNotes' });
        });
    });
}