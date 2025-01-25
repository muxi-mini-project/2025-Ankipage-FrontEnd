document.addEventListener('DOMContentLoaded', async () => {
    const logoutButton = document.getElementById('logoutButton');
    const switchAccountButton = document.getElementById('switchAccountButton');

    logoutButton.addEventListener('click', async () => {
        
        await chrome.storage.local.set({ isLoggedIn: false });
        console.log('Logged out, isLoggedIn set to false');
        window.close();
      
    });

    switchAccountButton.addEventListener('click', async () => {
       
        await chrome.storage.local.set({ isLoggedIn: false });
        console.log('Switching account, isLoggedIn set to false');
        window.close();
        const loginPageUrl = chrome.runtime.getURL('login.html');
        chrome.tabs.create({ url: loginPageUrl });
       
    });
});