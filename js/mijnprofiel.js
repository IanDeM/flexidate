var libversie, deKnop14, deKnop15;
var login_email, login_pw;

window.onload = function () {
    libversie = document.getElementById('libversie');
    var local_ingelogd = localStorage['ingelogd'];
//alert(local_ingelogd);
    console.log(scrumlib.getDatasetById(local_ingelogd));
    var jobject = scrumlib.getDatasetById(local_ingelogd);

    var buttonLogoff = document.querySelector('#deKnop18');
    buttonLogoff.addEventListener('click', function () {
        submitLogoff()
    });
    var buttonMail = document.querySelector('#buttonMail');
    buttonMail.addEventListener('click', function () {
        submitMail()
    });

    //-------Bepalen zodiac------//
    //var datums
    if (jobject[0].length = !0) {
        var datum = new Date(jobject[0].geboortedatum);
        var day = datum.getDate();
        var month = datum.getMonth() + 1;

        //var sterrenbeelden
        var zodiacSigns = [
            "Steenbok",
            "Waterman",
            "Vissen",
            "Ram",
            "Stier",
            "Tweelingen",
            "Kreeft",
            "Leeuw",
            "Maagd",
            "Weegschaal",
            "Schorpion",
            "Boogschutter"]

        //bepalening sterrenbeeld
        var zodiac = ""
        if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
            zodiac = zodiacSigns[0];
        }
        else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
            zodiac = zodiacSigns[1];
        }
        else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
            zodiac = zodiacSigns[2];
        }
        else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
            zodiac = zodiacSigns[3];
        }
        else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
            zodiac = zodiacSigns[4];
        }
        else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            zodiac = zodiacSigns[5];
        }
        else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
            zodiac = zodiacSigns[6];
        }
        else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
            zodiac = zodiacSigns[7];
        }
        else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
            zodiac = zodiacSigns[8];
        }
        else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
            zodiac = zodiacSigns[9];
        }
        else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
            zodiac = zodiacSigns[10];
        }
        else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            zodiac = zodiacSigns[11];
        }
    }
    if (jobject.length != 0) {
        // alert("gevonden");
        document.getElementById("_id").value = jobject[0]._id;
        document.getElementById("familienaam").value = jobject[0].familienaam;
        document.getElementById("naam").value = jobject[0].voornaam;
        document.getElementById("geboortedatum").value = jobject[0].geboortedatum;
        document.getElementById("mailadres").value = jobject[0].email;
        document.getElementById("nickname").value = jobject[0].nickname;
        document.getElementById("foto").src = "img/" + jobject[0].foto;

        document.getElementById("foto").name = jobject[0].foto;

        document.getElementById("beroep").value = jobject[0].beroep;
        document.getElementById("sexe").value = jobject[0].sexe;
        document.getElementById("oogkleur").value = jobject[0].oogkleur;
        document.getElementById("haarkleur").value = jobject[0].haarkleur;
        document.getElementById("grootte").value = jobject[0].grootte;
        document.getElementById("gewicht").value = jobject[0].gewicht;
        document.getElementById("wachtwoord").value = jobject[0].wachtwoord;
        document.getElementById("zodiac").value = zodiac;

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

} // einde windows onload


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
    localStorage.setItem("haarkleur", document.getElementById('haarkleur').value);
    localStorage.setItem("grootte", document.getElementById('grootte').value);
    localStorage.setItem("gewicht", document.getElementById('gewicht').value);
    localStorage.setItem("wachtwoord", document.getElementById('wachtwoord').value);
    localStorage.setItem("_id", document.getElementById('_id').value);
    localStorage.setItem("wachtwoordNieuw", document.getElementById('wachtwoordNieuw').value);
    localStorage.setItem("wachtwoordBevestigd", document.getElementById('wachtwoordBevestigd').value);
    if (document.getElementById("foto").name != "")
    {
    localStorage.setItem("foto",document.getElementById("foto").name);
    }
    


// de ingevulde velden via updatemap wegschrijven naar localstorage
    var updateMap = {};

    updateMap.familienaam = document.getElementById("familienaam").value;
    updateMap.voornaam = document.getElementById("naam").value;
    updateMap.geboortedatum = document.getElementById("geboortedatum").value;
    updateMap.email = document.getElementById("mailadres").value;
    updateMap.nickname = document.getElementById("nickname").value;
    if (document.getElementById("foto").name != "")
    {
    updateMap.foto = document.getElementById("foto").name;
    }
    else
    {
        updateMap.foto = document.getElementById("foto").value;   
    }
    updateMap.beroep = document.getElementById("beroep").value;
    updateMap.sexe = document.getElementById("sexe").value;
    updateMap.oogkleur = document.getElementById("oogkleur").value;
    updateMap.haarkleur = document.getElementById("haarkleur").value;
    updateMap.grootte = document.getElementById("grootte").value;
    updateMap.gewicht = document.getElementById("gewicht").value;
// controle of de velden met het nieuwe wachtwoord gelijk zijn elkaar


    if (document.getElementById("wachtwoordNieuw").value != "" && document.getElementById("wachtwoordBevestigd").value != "") {
        if (document.getElementById("wachtwoordNieuw").value == document.getElementById("wachtwoordBevestigd").value) {
            updateMap.wachtwoord = document.getElementById("wachtwoordNieuw").value;
        }

        else {
            alert("Beide nieuwe wachtwoorden moet gelijk zijn aan elkaar ! Het wachtwoord blijft ongewijzigd");
        }
    }
    else {
        updateMap.wachtwoord = document.getElementById("wachtwoord").value;
    }


    /*	if (document.getElementById("wachtwoordNieuw").value == "")
        {
            updateMap.wachtwoord = document.getElementById("wachtwoord").value;
        }
        else
        {
            updateMap.wachtwoord = document.getElementById("wachtwoordNieuw").value;
        }	*/
    // wegschrijven van de data naar de local storage
    scrumlib.updateDataset(localStorage.getItem("_id", document.getElementById('_id').value), updateMap);


    scrumlib.save();
    location.reload();
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
    window.open("index.html", "_self");
}

function submitLogoff() {
    console.log("submitLogoff");

    localStorage.removeItem("ingelogd");
    window.open("index.html", "_self");
}

function submitMail() {
    console.log("submitMail");

    location.href = "mailWebmaster.html";
}

//VWI

var fotoitem;
function myFunction(){
    var x = document.getElementById("myFile");
    var txt = "";
    if ('files' in x) {
      if (x.files.length != 0) {
        for (var i = 0; i < x.files.length; i++) {
          
          var file = x.files[i];
          if ('name' in file) {
            document.getElementById("foto").src = "img/" + file.name;
            document.getElementById("foto").name =  file.name;
          }
          
        }
      }
    } 
    
  };

