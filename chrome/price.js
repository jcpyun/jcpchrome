chrome.runtime.onMessage.addListener(function(request, sender) {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function(tabs) {
        //    var url = tabs[0].url;
        //    var your_url= url;
        //    console.log(url);
        //    jQuery.ajax = (function(_ajax) {
        //     var protocol = location.protocol,
        //         hostname = location.hostname,
        //         exRegex = RegExp(protocol + '//' + hostname),
        //         YQL = 'http' + (/^https/.test(protocol) ? 's' : '') + '://query.yahooapis.com/v1/public/yql?callback=?',
        //         query = 'select * from html where url="{URL}" and xpath="*"';
        //     function isExternal(url) {
        //         return !exRegex.test(url) && /:\/\//.test(url);
        //     }
        //     return function(o) {
        //         var url = o.url;
        //         if (/get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url)) {
        //             // Manipulate options so that JSONP-x request is made to YQL
        //             o.url = YQL;
        //             o.dataType = 'json';
        //             o.data = {
        //                 q: query.replace(
        //                     '{URL}',
        //                     url + (o.data ?
        //                         (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data) : '')
        //                 ),
        //                 format: 'xml'
        //             };
        //             // Since it's a JSONP request
        //             // complete === success
        //             if (!o.success && o.complete) {
        //                 o.success = o.complete;
        //                 delete o.complete;
        //             }
        //             o.success = (function(_success) {
        //                 return function(data) {
        //                     if (_success) {
        //                         // Fake XHR callback.
        //                         _success.call(this, {
        //                             responseText: data.results[0]
        //                                 // YQL screws with <script>s
        //                                 // Get rid of them
        //                                 .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
        //                         }, 'success');
        //                     }
        //                 };
        //             })(o.success);
        //         }
        //         return _ajax.apply(this, arguments);
        //     };
        // })(jQuery.ajax);
        // $.ajax({
        //     url: your_url,
        //     type: 'GET',
        //     success: function(res) {
        //         var text = res.responseText;
        //         // then you can manipulate your text as you wish
        //         console.log(text);
        //         var xmltext = text; //"<rss version='2.0'><channel><title>RSS Title</title></channel></rss>",
        //         var convertedXMLDoc = $.parseXML(xmltext);
        //         var xml = $(convertedXMLDoc);
        //         var title = xml.find("title");

        //         console.log(title);
        //     }
        // });

    });

    if (request.action == "getSource") {
        // message.innerText = request.source;

        request.source = request.source.replace(/[^\w\s]/gi, '');
        request.source = request.source.replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '');
        //request.source = request.source.replace(/[^a-zA-Z ]/g, "");
        var xmltext = request.source; //"<rss version='2.0'><channel><title>RSS Title</title></channel></rss>",
        var convertedXMLDoc = $.parseXML(xmltext);
        var xml = $(convertedXMLDoc);
        var title = xml.find("title");
        console.log('title', title);

        var a = request.source.search("priceblock_ourprice");
        var b = request.source.search("ourprice_shippingmessage");
        console.log(a, b);
        price.innerText = request.source.slice(a, b);
        console.log(request);
        // var xmltext =  request.source,

        // convertedXMLDoc = $.parseXML(xmltext),
        // xml = $(convertedXMLDoc);
        // price.innerText=  xml.find('span.a-color-price');

    }
});

// chrome.runtime.onMessage.addListener(function(request, sender) {
//   if (request.action == "getSource") {
//     // message.innerText = request.source;

//   }
// });


function onWindowLoad() {

    var price = document.querySelector('#price');


    chrome.tabs.executeScript(null, {
        file: "pt.js"
    }, function() {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            price.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    });

}


window.onload = onWindowLoad;
// window.onload = loadUrl;
