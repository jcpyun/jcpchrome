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
      alert(myTask)
    // if (!chrome.runtime.error) {
    //   console.log(items);
    //   document.getElementById("myTasks").innerText = items.myTasks;
    // }
  });
}
// var element;
// element = document.getElementById("results");
// if (element) {
//     element.innerHTML = "-new content-";
// }

// function saveChanges() {
//         // Get a value saved in a form.
//         var theValue = textarea.value;
//         // Check that there's some code there.
//         if (!theValue) {
//           message('Error: No value specified');
//           return;
//         }
//         // Save it using the Chrome extension storage API.
//         chrome.storage.sync.set({'value': theValue}, function() {
//           // Notify that we saved.
//           message('Settings saved');
//         });
//       }