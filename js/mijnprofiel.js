var libversie, deKnop14, deKnop15;
var login_email, login_pw;

window.onload = function () {

    libversie = document.getElementById('libversie');
    if (localStorage.getItem("switchup") == 0) {
        var local_ingelogd = localStorage['detailID'];
    }
    else {
        var local_ingelogd = localStorage['ingelogd'];

    }



    /*
        localStorage.setItem ("detailID",local_id);
        localStorage.setItem ("switchup","0");*/


//alert(local_ingelogd);
    console.log(scrumlib.getDatasetById(local_ingelogd));
    var jobject = scrumlib.getDatasetById(local_ingelogd);
    if (jobject.length != 0) {
        //alert("gevonden");
        document.getElementById("_id").value = jobject[0]._id;
        document.getElementById("familienaam").value = jobject[0].familienaam;
        document.getElementById("naam").value = jobject[0].voornaam;
        document.getElementById("geboortedatum").value = jobject[0].geboortedatum;
        document.getElementById("mailadres").value = jobject[0].email;
        document.getElementById("nickname").value = jobject[0].nickname;
        document.getElementById("foto").src = "img/" + jobject[0].foto;
        document.getElementById("beroep").value = jobject[0].beroep;
        document.getElementById("sexe").value = jobject[0].sexe;
        document.getElementById("oogkleur").value = jobject[0].oogkleur;
        document.getElementById("grootte").value = jobject[0].grootte;
        document.getElementById("gewicht").value = jobject[0].gewicht;
        document.getElementById("wachtwoord").value = jobject[0].wachtwoord;

    }
    else {
        alert("Onbestaand profiel !!!");
    }

    var knop_update = document.getElementById('opslaan');
    knop_update.addEventListener('click', opslaan);
    //VWI
    var knop_uitschrijf = document.getElementById('uitschrijven');
    knop_uitschrijf.addEventListener('click', uitschrijf);
   
	//VWI
	
	
};// einde windows onload


// opslaan van de aangepaste gegevens in de local storage
function opslaan() {
    localStorage.setItem("familienaam", document.getElementById('familienaam').value);
    localStorage.setItem("voornaam", document.getElementById('naam').value);
    localStorage.setItem("geboortedatum", document.getElementById('geboortedatum').value);
    localStorage.setItem("mailadres", document.getElementById('mailadres').value);
    localStorage.setItem("nickname", document.getElementById('nickname').value);
//localStorage.setItem("foto", document.getElementById('foto').src);  //*** Dit een uitbreiding?
    localStorage.setItem("beroep", document.getElementById('beroep').value);
    localStorage.setItem("sexe", document.getElementById('sexe').value);
    localStorage.setItem("oogkleur", document.getElementById('oogkleur').value);
    localStorage.setItem("grootte", document.getElementById('grootte').value);
    localStorage.setItem("gewicht", document.getElementById('gewicht').value);
    localStorage.setItem("wachtwoord", document.getElementById('wachtwoord').value);
    localStorage.setItem("_id", document.getElementById('_id').value);

// de ingevulde velden via updatemap wegschrijven naar localstorage
    var updateMap = {};

    updateMap.familienaam = document.getElementById("familienaam").value;
    updateMap.voornaam = document.getElementById("naam").value;
    updateMap.geboortedatum = document.getElementById("geboortedatum").value;
    updateMap.email = document.getElementById("mailadres").value;
    updateMap.nickname = document.getElementById("nickname").value;
    // updateMap.foto = document.getElementById("foto").value;
    updateMap.beroep = document.getElementById("beroep").value;
    updateMap.sexe = document.getElementById("sexe").value;
    updateMap.oogkleur = document.getElementById("oogkleur").value;
    updateMap.grootte = document.getElementById("grootte").value;
    updateMap.gewicht = document.getElementById("gewicht").value;
    updateMap.wachtwoord = document.getElementById("wachtwoord").value;
    // wegschrijven van de data naar de local storage
    scrumlib.updateDataset(localStorage.getItem("_id", document.getElementById('_id').value), updateMap);


    scrumlib.save();
}

//VWI
// opslaan van de aangepaste gegevens in de local storage
function uitschrijf() {
    localStorage.setItem("_id", document.getElementById('_id').value);

    if (document.getElementById('_id').value != "") {
		console.log("Wissen van het profiel");
        console.log(document.getElementById('_id').value);
        scrumlib.deleteDataset(document.getElementById('_id').value);
    }
    scrumlib.save();
    localStorage.removeItem("ingelogd");
    window.open("index.html","_self");
}
//VWI
