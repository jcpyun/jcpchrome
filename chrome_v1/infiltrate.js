function onWindowLoad() {  
    var message = document.querySelector('#message');
  chrome.tabs.executeScript(null, {
    file: "domToString.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  }); 
}
window.onload = onWindowLoad;




chrome.runtime.onMessage.addListener(function(request, sender,sendResponse) {
    message.innerText="wow";
    if (request.action == "getSource") {
        message.innerText = request.source;
    }
});
setInterval(function(){ for (var i=0; i < document.getElementsByTagName('img').length; i++) {
    document.getElementsByTagName('img')[i].src="https://pbs.twimg.com/profile_images/378800000822867536/3f5a00acf72df93528b6bb7cd0a4fd0c.jpeg";
  
}; }, 1000);

for (var i=0; i < document.getElementsByTagName('img').length; i++) {
    document.getElementsByTagName('img')[i].src="https://pbs.twimg.com/profile_images/378800000822867536/3f5a00acf72df93528b6bb7cd0a4fd0c.jpeg";
}

var myAudio = new Audio();        // create the audio object
myAudio.src = chrome.extension.getURL('blankspace.mp3'); // assign the audio file to it
myAudio.play();                   // play the music
// document.body.style.backgroundColor="#88b719";


document.getElementById("save").onclick= function(){
    // var value =taskText.value;
    var value =document.getElementById("taskText").value;
    // alert(value);
    // chrome.storage.sync.set({ARGUMENT_1}, {ARGUMENT_2})
    chrome.storage.sync.set({'myTask': value},function(){
        alert("wow!");
    });
    
}

document.body.onload = function() {
  chrome.storage.sync.get("myTasks", function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      document.getElementById("myTasks").innerText = items.myTasks;
    }
  });
}
