document.getElementById('classify-button').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let activeTab = tabs[0];
    let activeTabUrl = activeTab.url;

    // Send the URL to the background script to handle the email sending
    chrome.runtime.sendMessage({ action: 'sendEmail', url: activeTabUrl }, (response) => {
      if (response.success) {
        document.getElementById('thank-you-message').style.display = 'block';
      }
    });
  });
});
