// var contextsList = ['selection','link','image','page'];

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript({
        code: 'document.body.style.backgroundColor="red"'
    });
});

chrome.contextMenus.create({
    id: "wow",
    title: "ebay toolkit",
    contexts: ["selection"],
});


// chrome.contextMenus.onClicked.addListener(function myFunction(selectedText) {
//     alert(selectedText.selectionText);
// });

chrome.contextMenus.onClicked.addListener(function myFunction(selectedText) {
    chrome.tabs.create({ url: "https://www.ebay.com/sch/" + selectedText.selectionText })
});

chrome.pageCapture.on
