
chrome.runtime.onMessage.addListener(function(request, sender,sendResponse) {
  if (request.action == "getSource") {
    // message.innerText = request.source;
    if (request.source.search("amazon.com") == -1){
        message.innerText="This extension only works on Amazon. #amazonKiller"
    }
    else{
    var a= request.source.search("<title>Amazon.com");
    var b= request.source.search("</title>");
    var temp = request.source.slice(a+19,b).replace('&amp;', '');
    message.innerText = temp.substring(0,temp.lastIndexOf(':')); 
    // window.location="wow.html";
     // Parse the response and build an HTML table to display search results
    function _cb_findItemsByKeywords(root) {
        console.log('root',root);
        var items = root[0].searchResult[0].item || [];
        var html = [];
        html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
        for (var i = 0; i < items.length; ++i) {
            try{
                var item = items[i];
                var title = item.title;
                var pic = item.galleryURL;
                var viewitem = item.viewItemURL;
                var Price = '';
                try{
                    Price = item.sellingStatus[0].currentPrice[0]['__value__'];
                    Price += ' ' +  item.sellingStatus[0].currentPrice[0]['@currencyId'];
                    console.log('item.sellingStatus', item.sellingStatus[0].currentPrice[0]['@currencyId']);//.convertedCurrentPrice[0]['@currencyId']
                    
                }catch(e){
                    console.log(e);
                }
               
                //item.sellingStatus.currentPrice[0].convertedCurrentPrice[0]['@currencyId'];//__value__
                if (null != title && null != viewitem) {
                    html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' +
                        '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td><td><h2>'+Price+'</h2></td></tr>');//<tr><td><h2>'+Price+'</h2></td></tr>
                }
            }catch(e) {
                console.log(e);
            }
        }
        html.push('</tbody></table>');
   
        document.getElementById("results").innerHTML = html.join("");

        chrome.browserAction.setIcon({
            path: 'ebayicon3.png'
        });
        console.log('sonr');

    } // End _cb_findItemsByKeywords() function

    // Create a JavaScript array of the item filters you want to use in your request
    var filterarray = [{
        "name": "MaxPrice",
        "value": "25",
        "paramName": "Currency",
        "paramValue": "USD"
    }, {
        "name": "FreeShippingOnly",
        "value": "true",
        "paramName": "",
        "paramValue": ""
    }, {
        "name": "ListingType",
        "value": ["AuctionWithBIN", "FixedPrice", "StoreInventory"],
        "paramName": "",
        "paramValue": ""
    }, ];


    // Define global variable for the URL filter
    var urlfilter = "";

    // Generates an indexed URL snippet from the array of item filters
    function buildURLArray() {
        // Iterate through each filter in the array
        for (var i = 0; i < filterarray.length; i++) {
            //Index each item filter in filterarray
            var itemfilter = filterarray[i];
            // Iterate through each parameter in each item filter
            for (var index in itemfilter) {
                // Check to see if the paramter has a value (some don't)
                if (itemfilter[index] !== "") {
                    if (itemfilter[index] instanceof Array) {
                        for (var r = 0; r < itemfilter[index].length; r++) {
                            var value = itemfilter[index][r];
                            urlfilter += "&itemFilter\(" + i + "\)." + index + "\(" + r + "\)=" + value;
                        }
                    } else {
                        urlfilter += "&itemFilter\(" + i + "\)." + index + "=" + itemfilter[index];
                    }
                }
            }
        }
    } // End buildURLArray() function

    // Execute the function to build the URL filter
    buildURLArray(filterarray);

    console.log(encodeURIComponent(message.innerText.replace('&amp;', '')));

    // Construct the request
    // Replace MyAppID with your Production AppID
    var url = "http://svcs.ebay.com/services/search/FindingService/v1";
    url += "?OPERATION-NAME=findItemsByKeywords";
    url += "&SERVICE-VERSION=1.0.0";
    url += "&SECURITY-APPNAME=Rakshith-MyTestAp-PRD-c99ea60aa-6e73300a";
    url += "&GLOBAL-ID=EBAY-US";
    url += "&RESPONSE-DATA-FORMAT=JSON";
    //url += "&callback=_cb_findItemsByKeywords";
    url += "&REST-PAYLOAD";
    url += "&keywords=" + (encodeURIComponent(message.innerText.replace('&amp;', '')));
    url += "&sortOrder=PricePlusShippingLowest"
    //url += "&paginationInput.entriesPerPage=20";
    //url += urlfilter;

    $.getJSON(url, function(data){
    $.each(data, function (linktext, link) {
        console.log(linktext);
        console.log(link);
        _cb_findItemsByKeywords(link);
    });
});

    /*$.ajax({
        url: url,
        type: 'GET',
        success: function(res) {
            var text = res.responseText;
            // then you can manipulate your text as you wish
            console.log(res);
            _cb_findItemsByKeywords(JSON.parse(JSON.stringify(text)));
        }
    });*/

    // Submit the request 
    s = document.createElement('script'); // create script element
    s.src = url;
    //document.body.appendChild(s);
  }
  }
});




function onWindowLoad() {
   
    var message = document.querySelector('#message');
  chrome.tabs.executeScript(null, {
    file: "pt.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
  
}


window.onload = onWindowLoad;
// window.onload = loadUrl;