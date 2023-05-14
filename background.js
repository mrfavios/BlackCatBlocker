
function CheckNewTab(sourceTabUrl, newtabUrl){
	
	const pages = JSON.parse(localStorage.getItem("blocknewtabs")) || {};
	
	if (pages.hasOwnProperty(sourceTabUrl)){
		
		if (pages[sourceTabUrl]["sites"].includes(newtabUrl)){
				
			return false;
        
     		}
     		
     		if (pages[sourceTabUrl]["active"]){
     		
     			return true;
     		
     		}
     		
   	}
 	 
  	return false;

}


function getDomainFromUrl(url){

	let domain = (new URL(url));

	return domain.hostname; 
}


//block new tabs
browser.webNavigation.onCreatedNavigationTarget.addListener(async (details) => {
	
	const { tabId, url, sourceTabId} = details;
	const sourceTab = await browser.tabs.get(sourceTabId);
   
	console.log(`TARGET ${tabId}: ${url}`);
	console.log(`Source tab: ${sourceTabId}: ${sourceTab.url}`);
  
	const newtabUrl = getDomainFromUrl(url);
	const sourceTabUrl = getDomainFromUrl(sourceTab.url);
  
	console.log(CheckNewTab(sourceTabUrl, newtabUrl));
  
	if (getDomainFromUrl(url) !== getDomainFromUrl(sourceTab.url) && CheckNewTab(sourceTabUrl, newtabUrl)) {
    
		browser.tabs.remove(details.tabId);
  
  	}
  
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
  
    var url = details.url;

    if (url.includes("adformat=") || url.includes("ctier") || url.includes("alitags") ) {
      console.log("ADS:", url);
      return { cancel: true};
    } else {
      console.log("video:", url);
    }
  },
  {urls: ["https://*.googlevideo.com/videoplayback*"]},
  ["blocking"]
);


chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
  
    const blockUrls = new RegExp([
    "\\/api\\/stats\\/qoe\\?",
    "\\.youtube\\.com\\/pagead\\/adview\\?",
     "\\/api\\/stats\\/ads\\?",
    "\\.googlevideo\\.",
    "\\/api\\/stats\\/qoe\\?",
      "\\%22ad",
      "\\&adfmt\\=",
      "\\.atdmt\\.",
      "watch7ad\\_",
      "\\/api\\/ads",
      "\\.innovid\\.",
      "\\/adsales\\/",
      "\\/adserver\\/",
      "\\.fwmrm\\.net",
      "\\/stats\\/ads",
      "ad\\d-\\w*\\.swf$",
      "\\.doubleclick\\.",
      "flashtalking\\.com",
      "adservice\\.google\\.",
      "\\/www\\-advertise\\.",
      "s0\\.2mdn\\.net\\/ads",
      "google\\-analytics\\.",
      "\\.googleadservices\\.",
      "\\.googletagservices\\.",
      "\\.googlesyndication\\.",
      "\\.serving\\-sys\\.com\\/",
      "youtube\\.com\\/get_midroll_",
      "youtube\\.com\\/ptracking\\?",
      ":\\/\\/.*\\.google\\.com\\/uds\\/afs",
      "\\/csi\\?v\\=\\d+\\&s\\=youtube\\&action\\=",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]ad[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]ads[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adid[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adunit[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adhost[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]adview[\\=\\&\\_\\-\\.\\/\\?\\s]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]pagead[\\=\\&\\_\\-\\.\\/\\?\\s\\d]",
      "[\\=\\&\\_\\-\\.\\/\\?\\s]googleads[\\=\\&\\_\\-\\.\\/\\?\\s]"
    ].join('|'), 'i');
    
    const allowUrls = new RegExp([
      "\\.googlevideo\\.",
    //  "\\/api\\/stats\\/qoe\\?",
    ].join('|'), 'i');
    
    const annotationsUrls = new RegExp([
      "\\/annotations_module\\.", 
      "\\/annotations_invideo\\?",
    ].join('|'), 'i');

    
    if (blockUrls.test(details.url) && details.url.includes("adformat=")) {
    
    	return { cancel: true };	
    	
    }
    
    if (blockUrls.test(details.url) && !allowUrls.test(details.url) && !annotationsUrls.test(details.url)) {
      return { cancel: true };
    }
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);


function incrementBlockedCookie() {

  let count = Number(localStorage.getItem("blockedCookieCount")) || 0;
  count++;
  localStorage.setItem("blockedCookieCount", count);
  
}


function isInCE(name) {
  var CE = localStorage.getItem("CELIST"); // cookie exceptions list
  if (CE == null) {
    return false;
  }
  return CE.includes(name);
}


function deleteCookiesOnChanged(){

	browser.cookies.onChanged.addListener(function(changeInfo) {
	console.log(changeInfo);
		console.log(changeInfo.cookie.domain);

	  if (localStorage.getItem("switch2") === "true" && !isInCE(changeInfo.cookie.domain)) {
	    
	    incrementBlockedCookie();
	    
	    browser.cookies.remove({
	      
	      url: "https://" + changeInfo.cookie.domain + changeInfo.cookie.path,
	      name: changeInfo.cookie.name,
	      storeId: changeInfo.cookie.storeId
	    
	    });
	    console.log("COOKIE RIMOSSO");
	  
	  }
	
	});

}
/*
browser.cookies.onChanged.addListener((changeInfo) => {
  console.log(`Cookie changed: \n`
    + ` * Cookie: ${JSON.stringify(changeInfo.cookie)}\n`
    + ` * Cause: ${changeInfo.cause}\n`
    + ` * Removed: ${changeInfo.removed}`);
});

*/
deleteCookiesOnChanged()
console.log("Start");




