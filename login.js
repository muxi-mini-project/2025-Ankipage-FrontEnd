console.log('into login');

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        console.log("Email:", email, "Password:", password);
        alert("Login submitted!");

        const isAuthenticated = email === 'test@163.com' && password === 'test';
        console.log(isAuthenticated);

        if (isAuthenticated) {
            const [currentTab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const tabId = currentTab.id;

            await chrome.storage.local.set({ isLoggedIn: true });
            await chrome.sidePanel.open({ tabId });
            window.close();
        } else {
            alert('Login failed. Please try again.');
        }
    });
});