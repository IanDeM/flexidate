window.onload = function () {
    //console.log(scrumlib.getAllDatasets());
    //console.log("js geladen");
    console.log("js onload mailWebmaster");

    var buttonLogoff = document.querySelector('#deKnop18');
    buttonLogoff.addEventListener('click', function () {
        submitLogoff()
    });
   
};

function submitLogoff() {
    //console.log("submitLogoff");

    localStorage.removeItem("ingelogd");
    window.open("index.html","_self");
}
