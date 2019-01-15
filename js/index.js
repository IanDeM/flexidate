window.onload = function() {
	console.log(scrumlib.getAllDatasets());
    console.log("js geladen");
    var eLoginOptie = document.getElementById('loginOptie');
    var eInschrijvenOptie = document.getElementById('inschrijvenOptie');

	eLoginOptie.style.display = 'inline';
	eInschrijvenOptie.style.display = 'none';

    var buttonTop = document.querySelector('#deKnop14b');
    console.log(buttonTop);
    var buttonBottom = document.querySelector('#deKnop14');
    buttonTop.addEventListener('click', function () {
        changeButton(buttonTop, buttonBottom)
    });
    buttonBottom.addEventListener('click', function () {
        submitButton(buttonBottom)
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
    console.log("submitButton");
	
}