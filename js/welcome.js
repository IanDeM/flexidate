window.onload = function () {
    console.log(scrumlib.getAllDatasets());
    console.log("javascript geladen");

    var eLoginOptie = document.getElementById('loginOptie');
    var eInschrijvenOptie = document.getElementById('inschrijvenOptie');
    var buttonTop = document.querySelector('#deKnop14b');
    var buttonBottom = document.querySelector('#deKnop14');

    eLoginOptie.style.display = 'inline';
    eInschrijvenOptie.style.display = 'none';

    buttonTop.addEventListener('click', function () {
        changeButton(buttonTop, buttonBottom)
    });
    buttonBottom.addEventListener('click', function () {
        submitButton(buttonBottom)
    });
    var loginnm = document.getElementById('login_email');
    loginnm.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            submitButton(buttonBottom);
        }
    });
    var loginpw = document.getElementById('login_pw');
    loginpw.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            submitButton(buttonBottom);
        }
    });
    var inmail = document.getElementById('email');
    inmail.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            submitButton(buttonBottom);
        }
    });
    var pw1 = document.getElementById('wachtwoord1');
    pw1.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            submitButton(buttonBottom);
        }
    });
    var pw2 = document.getElementById('wachtwoord2');
    pw2.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { // 13 is enter
            submitButton(buttonBottom);
        }
    });


};

function changeButton(top, bottom) {
    console.log(top.innerHTML, bottom.innerHTML);

    var eLoginOptie = document.getElementById('loginOptie');
    var eInschrijvenOptie = document.getElementById('inschrijvenOptie');

    if (top.innerHTML === 'Inschrijven') {
        top.innerHTML = 'Inloggen';
        bottom.innerHTML = 'Inschrijven';
        eLoginOptie.style.display = 'none';
        eInschrijvenOptie.style.display = 'inline';
    }
    else if (top.innerHTML === 'Inloggen') {
        top.innerHTML = 'Inschrijven';
        bottom.innerHTML = 'Inloggen';
        eLoginOptie.style.display = 'inline';
        eInschrijvenOptie.style.display = 'none';
    }
}

function submitButton(bottom) {
    //alert(bottom.innerHTML);
    if (bottom.innerHTML === "Inloggen") {
        // inloggen met de verkregen gegevens
        //alert(document.getElementById('login_email').value);
        //alert(document.getElementById('login_pw').value);
        login_email = document.getElementById('login_email').value;
        login_pw = document.getElementById('login_pw').value;
        var ingelogd = false;
        ingelogd = scrumlib.login(login_email, login_pw);
        if (ingelogd == false) {
            alert("Verkeerde username en/of paswoord");
            //var local_ingelogd = localStorage['ingelogd'];
            localStorage.removeItem('ingelogd');
        }
        else {
            //alert("ingelogd");
            localStorage.setItem('ingelogd', ingelogd);
            // hieronder nog aanpassen wat na het inloggen moet gebeuren
            window.open("profielen.html", "_self");
        }
    }
    if (bottom.innerHTML === "Inschrijven") {
        // inschrijven met de verkregen gegevens
        //alert(document.getElementById('email').value);
        //alert(document.getElementById('wachtwoord').value);
        login_email = document.getElementById('email');
        login_pw1 = document.getElementById('wachtwoord1');
        login_pw2 = document.getElementById('wachtwoord2');

        //login return id of false
        var condition = {email: {"waarde": login_email.value, "match": "="}};
        //console.log(scrumlib.getDatasetsByConditions(condition));
        var jobject = scrumlib.getDatasetsByConditions(condition);

        if (jobject.length != 0) {
            alert("Registratie met dit email adres is al reeds gebeurd");
            console.log(jobject);
            console.log(jobject.length);
            console.log(jobject[0].email);

        }
        //console.log(login_pw1.value);
        //console.log(login_pw2.value);
        if (login_pw1.value == "" || login_pw2.value == "") {
            alert("Gelieve beide paswoorden in te vullen");
        }
        if (login_pw1.value != login_pw2.value) {
            alert("Beide paswoorden moeten gelijk zijn.");
        }

        if (jobject.length == 0 && login_pw1.value == login_pw2.value && login_pw1.value != "" && login_pw2.value != "") {

            var new_profiel = {
                beroep: "",
                email: login_email.value,
                familienaam: "",
                foto: "",
                geboortedatum: "",
                gewicht: 0,
                grootte: 0,
                haarkleur: "",
                nickname: "",
                oogkleur: "",
                sexe: "",
                voornaam: "",
                wachtwoord: login_pw1.value
            };
            var jnewobject = scrumlib.createDataset(new_profiel);
            if (jnewobject.length != 0) {
                scrumlib.save();

                console.log(scrumlib.getAllDatasets());
                localStorage.setItem("ingelogd", jnewobject[0]._id);
                localStorage.setItem("switchup", "1");

                window.open("mijnprofiel.html", "_self");
            }
        }
    }
    console.log("submitButton");
}

