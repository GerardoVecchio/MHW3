 function creaSchede(){ 
    var nsquadre = nomesquadra.length;
    var TeamGrid = document.getElementById('team-grid');
    var ngiocatori = nomeG.length;
    var Ggrid= document.getElementById('player-grid');  
    for(let i=0 ; i < nsquadre; i++){
        var div= document.createElement('div');
        div.className='squadra';
        div.id='squadra'+ i;
            var nome= document.createElement('div');
            nome.className='nome';
                var h1 = document.createElement('h1');
                h1.id='h1' +i;
                h1.textContent= nomesquadra[i];
                nome.appendChild(h1);
                var buttonimg = document.createElement('img');
                buttonimg.id='icon';
                buttonimg.setAttribute('onclick', 'aggiungiaScelte('+i+')');
                buttonimg.src='add-icon.png';
                nome.appendChild(buttonimg);
                div.appendChild(nome);
                var img=document.createElement('img');
                img.setAttribute('onclick', 'mostraDescrizione('+i+')');
                img.src=immagini[i];
                div.appendChild(img);
                var descr = document.createElement('div');
                descr.className='descrizioneS';
                descr.id='iddescrizioneS' +i;
                descr.textContent = descrizione[i];
                div.appendChild(descr);
                TeamGrid.appendChild(div);
    }
    for(let j=0; j<ngiocatori; j++){
        console.log(ngiocatori);
        var divG= document.createElement('div');
        divG.className='giocatore';
        divG.id='giocatore' +j;
        var nome= document.createElement('div');
        nome.className ='nomeG';
            var h1=document.createElement('h1');
            h1.id='h1' +j;
            h1.textContent=nomeG[j];
            nome.appendChild(h1);
            var buttonimg=document.createElement('img');
            buttonimg.id='icon';
            buttonimg.setAttribute('onclick','aggiungiGiocatore('+j+')');
            buttonimg.src='add-icon.png';
            nome.appendChild(buttonimg);
            divG.appendChild(nome);
            var img=document.createElement('img');
            img.setAttribute('onclick', 'showDescr('+j+')');
            img.src=imgG[j];
            divG.appendChild(img);
            var descr=document.createElement('div');
            descr.className='descrizioneG';
            descr.id='iddescrizioneG' +j;
            descr.textContent=desczG[j];
            let stat = document.createElement('ul');
            let pti= document.createElement('li');
            pti.textContent= 'Pti. Ultima Stagione:  '+ppg[j];
            stat.appendChild(pti);
            let ass= document.createElement('li');
            ass.textContent= 'Ass. Ultima Stagione:  '+apg[j];
            stat.appendChild(ass);
            let rimb= document.createElement('li');
            rimb.textContent= 'Rim. Ultima Stagione:  '+rpg[j];
            stat.appendChild(rimb);
            descr.appendChild(stat);
            divG.appendChild(descr);
            Ggrid.appendChild(divG);
    }
}

document.addEventListener('DOMContentLoaded', function(){
    rest_url_players = 'http://data.nba.net/10s/prod/v1/2020/players.json';
    var F=fetch(rest_url_players).then(onResponse).then(cercaGiocatori);
    Promise.resolve(F).then(importaStat);
}, false);

function onResponse(response){
    return response.json();
}

function cercaGiocatori(json){
    let count=Object.keys(json.league.standard).length;
    for( let j =0; j<nomeG.length; j++){
        var completo = cognomeG[j]+', '+nomeG[j];
            for(let i = 0; i<count; i++ ){               
                var str = json.league.standard[i].temporaryDisplayName;
                if(completo === str){
                    giocatoriInterni.push(json.league.standard[i]);
                    console.log(str);
                    console.log(giocatoriInterni[j]);
                }
            }
    }
}

function importaStat(){
    var req=[];

        for(let k =0; k<giocatoriInterni.length; k++){
            var playerId = giocatoriInterni[k].personId;

            rest_url = 'http://data.nba.net/prod/v1/2020/players/'+playerId+'_profile.json';
            req.push(rest_url);            
        }
        for(let l=0; l<req.length; l++){
        fetches.push(fetch(req[l]).then(onResponse));
    }    
    var X=Promise.all(fetches).then(caricaDati);
    Promise.resolve(X).then(creaSchede);
}

function caricaDati(){
    for(let m=0 ; m<fetches.length; m++){
        fetches[m].then((value)=> {
            ppg.push(value.league.standard.stats.latest.ppg);
            rpg.push(value.league.standard.stats.latest.rpg);
            apg.push(value.league.standard.stats.latest.apg);
        });
    }
    //console.log(ppg);
    //console.log(rpg);
    //console.log(apg);
} 