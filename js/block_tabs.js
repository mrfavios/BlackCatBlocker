const currentUrlSpan = document.getElementById("currentUrl");
const blockBtn = document.getElementById("blockBtn");
const allowInputContainer = document.getElementById("allowInputContainer");
const addAllowBtn = document.getElementById("addAllowBtn");
const allowedSitesList = document.getElementById("allowedSitesList");
const unblockBtn = document.getElementById("unblockBtn");

var currentUrl = ""

function getDomain(url){
	
	return new URL(url).hostname;

}

// Get the current tab URL and update the currentUrlSpan
browser.tabs.query({ active: true, currentWindow: true }).then(async (tabs) => {
        
        currentUrl = tabs[0].url;
        currentUrlSpan.textContent = getDomain(currentUrl);

        const blockedSites = JSON.parse(localStorage.getItem("blocknewtabs")) || {};
        
        try{
        	
        	var t = blockedSites[getDomain(currentUrl)];
        	
        	if(t["active"]){
        	
        		blockBtn.style.display = "none";
        		allowInputContainer.style.display = "block";
        		unblockBtn.style.display = "block";
        		const bS = blockedSites[getDomain(currentUrl)]["sites"];
        		
        		for(var i = 0; i < bS.length; i++){
        		
        			allowedSitesList.textContent += bS[i] + "\n";
        		
        		}
        	
        	}
        	
        	else{
        	
        		blockBtn.addEventListener("click", () => {
            
            
		    		const currentDomain = getDomain(currentUrl);
		    		
		    		if(currentDomain){
		    		
		    			if(!blockedSites[currentDomain].hasOwnProperty("active")){
		    			
			    			blockedSites[currentDomain] = {"sites": [], "active": true};
					
					}
					
					else{
						
						blockedSites[currentDomain]["active"] = true;	
						
					}
						
					localStorage.setItem("blocknewtabs", JSON.stringify(blockedSites));
			    		blockBtn.style.display = "none";
			    		allowInputContainer.style.display = "block";
			    		unblockBtn.style.display = "block";
		    		
		    		}
            
       			});
        	
        	}
        
        }
        
        catch(err){
        
        	blockBtn.addEventListener("click", () => {
            
            
            		const currentDomain = getDomain(currentUrl);
            		
            		if(currentDomain){
		    		
			    	if(!blockedSites.hasOwnProperty(currentDomain)){
		    			
			    		blockedSites[currentDomain] = {"sites": [], "active": true};
					
				}
				
				else{
						
					blockedSites[currentDomain]["active"] = true;	
						
				}
				
			    	localStorage.setItem("blocknewtabs", JSON.stringify(blockedSites));
			    	blockBtn.style.display = "none";
			    	allowInputContainer.style.display = "block";
			    	unblockBtn.style.display = "block";
		    		
		    	}
            
       		});
        
        }

});


unblockBtn.addEventListener("click", () => {
	
	const sites = JSON.parse(localStorage.getItem("blocknewtabs"));
	
	console.log(sites);
	
	try{
	
		sites[getDomain(currentUrl)]["active"] = false;
		localStorage.setItem("blocknewtabs", JSON.stringify(sites));
		blockBtn.style.display = "block";
		allowInputContainer.style.display = "none";
		unblockBtn.style.display = "none";
	}
	
	catch(err){
	
		console.log(err.message);
	
	}
        
});

// Add allowed site button
addAllowBtn.addEventListener("click", () => {
	
	const Sites = JSON.parse(localStorage.getItem("blocknewtabs"));
	
	console.log(Sites);
	
	try{
	
		var domain = getDomain("https://" + allowInput.value.trim());
		
		if(!Sites[getDomain(currentUrl)]["sites"].includes(domain)){
	
			Sites[getDomain(currentUrl)]["sites"].push(domain);
			localStorage.setItem("blocknewtabs", JSON.stringify(Sites));
			allowedSitesList.textContent += domain + "\n";
			
		}
		
		allowInput.value = "";
	
	}
	
	catch(err){
	
		console.log(err.message);
	
	}
        
});
