

function showBlockedCookies() {
  let count = Number(localStorage.getItem("blockedCookieCount") || 0);
  let list = document.getElementById("blocked-cookies");
  
  item.textContent = '${count}';

}



showBlockedCookies();
