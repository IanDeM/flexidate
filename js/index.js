window.onload = function () {
    console.log(scrumlib.getAllDatasets());
    console.log("js geladen");

    var zoek_id = document.getElementById('zoek_id');
    var zoek_index = document.getElementById('zoek_index');
    var zoek_voornaam = document.getElementById('zoek_voornaam');
    var zoek_sexe = document.getElementById('zoek_sexe');
    var zoek_haarkleur = document.getElementById('zoek_haarkleur');
    var zoek_grootte = document.getElementById('zoek_grootte');
    var zoek_datum = document.getElementById('zoek_datum');

    console.log(scrumlib.getAllDatasets());

    console.log("js onload overzicht");

    var buttonProfiel = document.querySelector('#deKnop17');
    buttonProfiel.addEventListener('click', function () {
        submitProfiel()
    });

    var buttonLogoff = document.querySelector('#deKnop18');
    buttonLogoff.addEventListener('click', function () {
        submitLogoff()
    });

    loadProfiles();

    setSearchVisibility(scrumlib.getDatasetById(localStorage.getItem("ingelogd")));
    /*toonVoortgangProfiel(scrumlib.getDatasetById(localStorage.getItem("ingelogd")));*/


    var deKnop16 = document.getElementById('deKnop16');


    deKnop16.addEventListener('click', function () {

        var aAllDatasets = scrumlib.getAllDatasets();
        console.log(aAllDatasets);
        var idSet = scrumlib.getDatasetById(zoek_id.value);
        var filteredSet = aAllDatasets;

        if (idSet.length !== 0) {
            filteredSet = filterSearchResults(aAllDatasets, idSet);
        }

        var fuzzy = document.getElementById('voornaam_fuzzy').checked;
        var match = (fuzzy === true) ? "~" : "=";
        var condition = {voornaam: {"waarde": zoek_voornaam.value, "match": match}};
        var voornaamSet = scrumlib.getDatasetsByConditions(condition);
        console.log(voornaamSet);

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

        console.log(filteredSet);
    });

};

function setSearchVisibility(loggedUser) {
    var oUser = loggedUser[0];
    var eVoornaam = document.getElementById('zoek_voornaam');
    var eFuzzy = document.getElementById('voornaam_fuzzy');
    var eSexe = document.getElementById('zoek_sexe');
    var eHaarkleur = document.getElementById('zoek_haarkleur');
    var eKleiner = document.getElementById('zoek_grootte');
    var eGebDatum = document.getElementById('zoek_datum');
    if (oUser.voornaam === "") {
        eVoornaam.disabled = true;
        eFuzzy.disabled = true;
    }
    if (oUser.sexe === "") {
        eSexe.disabled = true;
    }
    if (oUser.haarkleur === "") {
        eHaarkleur.disabled = true;
    }
    if (oUser.grootte === 0) {
        eKleiner.disabled = true;
    }
    if (oUser.geboortedatum === "") {
        eGebDatum.disabled = true;
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


/*
function toonVoorgangProfiel(loggedUser){
    var oUser = loggedUser[0];
    var totaalVelden = 14;

*/