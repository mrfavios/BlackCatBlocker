

var ls = localStorage;

const switch1 = document.getElementById('switch1');
const switch2 = document.getElementById('switch2');
const switch3 = document.getElementById('switch3');
const siteBtn = document.getElementById('site-btn');
const saveBtn = document.getElementById('save-btn');
const lista = document.getElementById('lista');

function saveOptions() {
	
	ls.setItem("switch1", switch1.checked);
	ls.setItem("switch2", switch2.checked);
	
}


function setOption(name, switchX){

  var item = ls.getItem(name);
   
   if (item == "true"){
   
   	switchX.checked = true;
   
   }
   
   else{
   
   	switchX.checked = false;
   
   }

}


function loadOptions() {

  setOption("switch1", switch1);
  setOption("switch2", switch2);
  
}

saveBtn.addEventListener('click', saveOptions);

siteBtn.addEventListener('click', function() {
    chrome.tabs.create({ url: "https://mrfavios.github.io" });
  });

loadOptions();



