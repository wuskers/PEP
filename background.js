chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sendEmail') {
    const url = request.url;
    const emailAddress = 'your-email@example.com'; // Replace with your email address
    const subject = 'Positive Engagement Example';
    const body = `This website has been classified as an example of positive engagement: ${url}`;

    // Make an HTTP POST request to your email sending service
    fetch('https://your-email-webhook-url.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: emailAddress,
        subject: subject,
        body: body
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        sendResponse({ success: true });
      } else {
        sendResponse({ success: false });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      sendResponse({ success: false });
    });

    // Indicate that the response will be sent asynchronously
    return true;
  }
});
