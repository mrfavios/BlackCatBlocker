// Recupera la lista dei domini dei cookie eccezioni dal localstorage
var ceList = JSON.parse(localStorage.getItem("CELIST")) || [];

// Mostra i domini dei cookie eccezioni nella lista
var ceListElement = document.getElementById("ce-list");
ceList.forEach(function(domain) {
  var domainItem = document.createElement("li");
  domainItem.textContent = domain;
  ceListElement.appendChild(domainItem);
});

// Aggiunge un nuovo dominio ai cookie eccezioni quando viene inviato il form
var form = document.querySelector("form");
form.addEventListener("submit", function(event) {
  event.preventDefault();
  var domainInput = document.getElementById("ce-domain");
  var domain = domainInput.value;
  if (!ceList.includes(domain)) {
    ceList.push(domain);
    localStorage.setItem("CELIST", JSON.stringify(ceList));
    var domainItem = document.createElement("li");
    domainItem.textContent = domain;
    ceListElement.appendChild(domainItem);
  }
  domainInput.value = "";
});

