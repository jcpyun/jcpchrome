// alert(document.domain);
// document.location("https://ebay.com");
chrome.runtime.sendMessage("document.getElementsByTagName('title')[0].innerText");