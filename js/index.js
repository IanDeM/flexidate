window.onload = function () {
    //console.log(scrumlib.getAllDatasets());
    //console.log("js geladen");

    var zoek_id = document.getElementById('zoek_id');
    var zoek_index = document.getElementById('zoek_index');
    var zoek_voornaam = document.getElementById('zoek_voornaam');
    var zoek_sexe = document.getElementById('zoek_sexe');
    var zoek_haarkleur = document.getElementById('zoek_haarkleur');
    var zoek_grootte = document.getElementById('zoek_grootte');
    var zoek_datum = document.getElementById('zoek_datum');

    //console.log(scrumlib.getAllDatasets());

    //console.log("js onload overzicht");

    var buttonProfiel = document.querySelector('#deKnop17');
    buttonProfiel.addEventListener('click', function () {
        submitProfiel()
    });

    var buttonLogoff = document.querySelector('#deKnop18');
    buttonLogoff.addEventListener('click', function () {
        submitLogoff()
    });

    
    var loggedUser = scrumlib.getDatasetById(localStorage.getItem("ingelogd"));
    setSearchVisibility(loggedUser);
	//console.log(scrumlib.getDatasetById(localStorage.getItem("ingelogd")));
    /*toonVoortgangProfiel(scrumlib.getDatasetById(localStorage.getItem("ingelogd")));*/

	var filteredSet = scrumlib.getAllDatasets();
	

    //console.log(filteredSet);

    var myNode = document.getElementById("containerOverzicht");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    var eContainer=document.getElementById("containerOverzicht");
    var eUl = document.createElement('div');
    //jsObject = JSON.parse(localStorage.flexidata);
	jsObject = filteredSet;
    var aantal = jsObject.length;
    for(var i=0;i<aantal;i++){
        //console.log(i);
        var eLi = document.createElement('beeld');

        eElem = jsObject[i];

        fichier = "img/" + eElem.foto;

        eLi.innerHTML= "<img width='100' src=" + fichier + " onclick=clickPhoto('" + eElem._id +"') alt='Geen foto' title='"+ eElem.nickname +"'>";

        eUl.appendChild(eLi);
    }
    eContainer.appendChild(eUl);
    eContainer.style.display = 'inline';

	
	





    setVoortgangProfiel(scrumlib.getDatasetById(localStorage.getItem("ingelogd")));


    var deKnop16 = document.getElementById('deKnop16');


    deKnop16.addEventListener('click', function () {

        var aAllDatasets = scrumlib.getAllDatasets();
       // console.log(aAllDatasets);
        var idSet = scrumlib.getDatasetById(zoek_id.value);
        var filteredSet = aAllDatasets;

        if (idSet.length !== 0) {
            filteredSet = filterSearchResults(aAllDatasets, idSet);
        }

        var fuzzy = document.getElementById('voornaam_fuzzy').checked;
        var match = (fuzzy === true) ? "~" : "=";
        var condition = {voornaam: {"waarde": zoek_voornaam.value, "match": match}};
        var voornaamSet = scrumlib.getDatasetsByConditions(condition);
        //console.log(voornaamSet);

        if ((voornaamSet.length !== 0) /*&& (fuzzy.disabled===false) && (zoek_voornaam.disabled === false)*/) {
            filteredSet = filterSearchResults(filteredSet, voornaamSet);
        }
        var indexSet = scrumlib.getDatasetByIndex(zoek_index.value);
        if (zoek_index.value !== "" && indexSet !== undefined) {
            filteredSet = filterSearchResults(filteredSet, indexSet);
        }


        var zoek = zoek_sexe.value;
        if (zoek !== "") {
            match = "=";
            condition = {sexe: {"waarde": zoek, "match": match}};
            var sexeSet = scrumlib.getDatasetsByConditions(condition);
            filteredSet = filterSearchResults(filteredSet, sexeSet);
        }

        condition = {haarkleur: {"waarde": zoek_haarkleur.value, "match": "~"}};
        var haarkleurSet = scrumlib.getDatasetsByConditions(condition);
        if (haarkleurSet.length !== 0) {
            filteredSet = filterSearchResults(filteredSet, haarkleurSet);
        }

        condition = {grootte: {"waarde": zoek_grootte.value, "match": "<"}};
        var grootteSet = scrumlib.getDatasetsByConditions(condition);
        if (grootteSet.length !== 0) {
            filteredSet = filterSearchResults(filteredSet, grootteSet);
        }

        condition = {geboortedatum: {"waarde": zoek_datum.value, "match": "<"}};
        var gebDatumSet = scrumlib.getDatasetsByConditions(condition);
        if (gebDatumSet.length !== 0) {
            filteredSet = filterSearchResults(filteredSet, gebDatumSet);
        }

        //      console.log(filteredSet);

        var myNode = document.getElementById("containerOverzicht");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        var eContainer=document.getElementById("containerOverzicht");
        var eUl = document.createElement('div');
        //jsObject = JSON.parse(localStorage.flexidata);
        jsObject = filteredSet;
        var aantal = jsObject.length;
        for(var i=0;i<aantal;i++){
            //console.log(i);
            var eLi = document.createElement('beeld');

            eElem = jsObject[i];

            fichier = "img/" + eElem.foto;

            eLi.innerHTML= "<img width='100' src=" + fichier + " onclick=clickPhoto('" + eElem._id +"') alt='Geen foto' title='"+ eElem.nickname +"'>";

            eUl.appendChild(eLi);
        }
        eContainer.appendChild(eUl);
        eContainer.style.display = 'inline';
	 });
};


function submitProfiel() {
    //console.log("submitProfiel");

    localStorage.setItem ("detailID",localStorage.getItem("ingelogd"));
    localStorage.setItem ("switchup","1");

    location.href = "mijnprofiel.html";
}

function submitLogoff() {
    //console.log("submitLogoff");

    localStorage.removeItem("ingelogd");
    window.open("index.html","_self");
}
 


function clickPhoto(local_id) {
    //console.log("Toon detail voor " + local_id );

    localStorage.setItem ("detailID",local_id);
    localStorage.setItem ("switchup","0");

    location.href = "mijnprofiel.html";
}



function setSearchVisibility(loggedUser) {
    var oUser = loggedUser[0];
    var eVoornaam = document.getElementById('zoek_voornaam');
    var zVoornaam = document.getElementById('zVoornaam');
    var eFuzzy = document.getElementById('voornaam_fuzzy');
    var eSexe = document.getElementById('zoek_sexe');
    var zSexe = document.getElementById('zSexe');
    var eHaarkleur = document.getElementById('zoek_haarkleur');
    var zHaarkleur = document.getElementById('zHaarkleur');
    var eKleiner = document.getElementById('zoek_grootte');
    var zGrootte = document.getElementById('zGrootte');
    var eGebDatum = document.getElementById('zoek_datum');
    var zGebDatum = document.getElementById('zGebdatum');




    if (oUser.voornaam === "") {
        eVoornaam.style.display = "none";
        eFuzzy.style.display = "none";
        zVoornaam.style.display = "none";
    }
    if (oUser.sexe === "") {
        eSexe.style.display = "none";
        zSexe.style.display = "none";
    }
    if (oUser.haarkleur === "") {
        eHaarkleur.style.display = "none";
        zHaarkleur.style.display = "none";
    }
    if (oUser.grootte === 0) {
        eKleiner.style.display = "none";
        zGrootte.style.display = "none";
    }
    if (oUser.geboortedatum === "") {
        eGebDatum.style.display = "none";
        zGebDatum.style.display = "none";
    }
}

function filterSearchResults(firstArray, secondArray) {
    var tempSet = [];
    for (i = 0; i < firstArray.length; i++) {
        for (j = 0; j < secondArray.length; j++) {

            if (firstArray[i]._id === secondArray[j]._id) {
                tempSet.push(firstArray[i]);
            }
        }
    }
    return tempSet;
}

function setVoortgangProfiel(loggedUser) {
    var oUser = loggedUser[0];
    var totaalVelden = 11;
    var ingevuld = 0;
    var oVoortgang = document.getElementById('voortgangProfiel');


    if (oUser.beroep !== "") {
        ingevuld++;
    }
    if (oUser.familienaam !== "") {
        ingevuld++;
    }
    if (oUser.foto !== "") {
        ingevuld++;
    }
    if (oUser.geboortedatum !== "") {
        ingevuld++;
    }
    if (oUser.gewicht > 0) {
        ingevuld++;
    }
    if (oUser.grootte > 0) {
        ingevuld++;
    }
    if (oUser.haarkleur !== "") {
        ingevuld++;
    }
    if (oUser.nickname !== "") {
        ingevuld++;
    }
    if (oUser.oogkleur !== "") {
        ingevuld++;
    }
    if (oUser.sexe !== "") {
        ingevuld++;
    }
    if (oUser.voornaam !== "") {
        ingevuld++;
    }

    var procent = Math.round((100 / totaalVelden) * ingevuld);

    oVoortgang.innerHTML = "Profielstatus";

    document.getElementById('progressBarInside').style.width = procent + "px";
    document.getElementById('barText').innerHTML = procent+"%";

    var boodschapZoek = document.getElementById('boodschapZoekMogelijkheden');
    if(procent === 100) {boodschapZoek.style.display ="none";}

}

