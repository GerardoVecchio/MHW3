fetch("https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=nba&pageNumber=1&pageSize=5&autoCorrect=true&withThumbnails=true", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "11f95f18admshecc528c9bdf5f1ep1e59f8jsn19ba48e7e784",
		"x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
	}
})
.then(response => {
	return response.json();
}).then(caricaNotizie);

function caricaNotizie(json){
    console.log(json);
    let sect=document.getElementById('dadN');  
    for(let i=0; i<5; i++){
        let notizia =document.createElement('div');
        notizia.className="notizia";
        notizia.id = "notizia" +i;
            var h1= document.createElement('h1');
            h1.textContent = json.value[i].title;
            notizia.appendChild(h1);

            var img= document.createElement('img');
            img.src= json.value[i].image.url;
            notizia.appendChild(img);
            
            var form= document.createElement('form');
            form.method= "get";
            form.action=json.value[i].url;

            var bttn = document.createElement('button');
            bttn.type="submit";
            bttn.textContent="clicca per leggere la notizia";
            
            form.appendChild(bttn);
            notizia.appendChild(form);

        sect.appendChild(notizia);
    }
}