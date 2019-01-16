
function submitProfiel() {
    console.log("submitProfiel");

    localStorage.setItem ("detailID",localStorage.getItem("ingelogd"));
    localStorage.setItem ("switchup","1");

    location.href = "mijnprofiel.html";
}

function submitLogoff() {
    console.log("submitLogoff");

    localStorage.removeItem("ingelogd");
    window.open("index.html","_self");
}

function loadProfiles() {
// Begin HTML aanmaak	containerOverzicht
    var myNode = document.getElementById("containerOverzicht");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var eContainer=document.getElementById("containerOverzicht");

    var eUl = document.createElement('div');

    jsObject = JSON.parse(localStorage.flexidata)

    var aantal = jsObject.length;

    for(var i=0;i<aantal;i++){
        console.log(i);
        var eLi = document.createElement('beeld');

        eElem = jsObject[i];

        fichier = "img/" + eElem.foto;

        eLi.innerHTML= "<img width='100' src=" + fichier + " onclick=clickPhoto('" + eElem._id +"') alt='Geen foto' title='"+ eElem.nickname +"'>";

        eUl.appendChild(eLi);

    }

    eContainer.appendChild(eUl);

    eContainer.style.display = 'inline';

}

function clickPhoto(local_id) {
    console.log("Toon detail voor " + local_id );

    localStorage.setItem ("detailID",local_id);
    localStorage.setItem ("switchup","0");

    location.href = "mijnprofiel.html";
}
