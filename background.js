function removeCookieBanners(tab) {
  browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const cookieBanners = div.querySelectorAll('[class*="cookie"], [id*="cookie"], [class*="privacy"], [id*="privacy"], #iubenda-cs-banner.privacy-cp-wall');


cookieBanners.forEach((banner) => {
  const bannerText = banner.textContent.toLowerCase();
  if (bannerText.includes("cookie")) {
    banner.style.display = "none";
  }
});

    },
  });
}

/*
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    removeCookieBanners(tab);
  }
});
*/


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

	  if (localStorage.getItem("switch2") === "true" && !isInCE(changeInfo.cookie.domain)) {
	    
	    incrementBlockedCookie();
	    
	    browser.cookies.remove({
	      url: "https://" + changeInfo.cookie.domain + changeInfo.cookie.path,
	      name: changeInfo.cookie.name,
	      storeId: changeInfo.cookie.storeId
	    });
	  }
	});

}

deleteCookiesOnChanged()
console.log("Start");


