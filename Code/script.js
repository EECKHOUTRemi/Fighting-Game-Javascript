// Définition des Variables

var pvAlien = document.querySelector('#pvAlien');
var degSubisAlien = document.querySelector('.degatsAlien')

var pvAstro = document.querySelector('#pvAstro');
var degSubisAstro = document.querySelector('.degatsAstro')

pvAlien.value = 100;
pvAstro.value = 100;

// Attaque et défense

var att;

// Alien

var btnAttAlien = document.querySelector('.btnAttAlien');
var btnDefAlien = document.querySelector('.btnDefAlien');
var isDefAlien = false;

// Astronaute

var btnAttAstro = document.querySelector('.btnAttAstro');
var btnDefAstro = document.querySelector('.btnDefAstro');
var isDefAstro = false;

// Consommables

// Alien

var btnBoostAlien = document.querySelector('.btnBoostAlien');
var alienIsBoost = false;
var alienBoostIsUsed = false;

var btnPotAlien = document.querySelector('.btnPotAlien');
var alienIsHealed = false;

// Astronaute

var btnBoostAstro = document.querySelector('.btnBoostAstro');
var astroIsBoost = false;
var astroBoostIsUsed = false;

var btnPotAstro = document.querySelector('.btnPotAstro');
var astroIsHealed = false;

// Images

var imgAlien = document.querySelector('#Alien');
var imgAstro = document.querySelector('#Astro');
var imgGriffe = document.querySelector('#griffe');
var imgPoing = document.querySelector('#poing');



// Definition des Fonctions

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
};

function disableBtnAlien() {

    btnAttAlien.classList.add('bgGrey');
    btnDefAlien.classList.add('bgGrey');
    btnAttAstro.classList.remove('bgGrey');
    btnDefAstro.classList.remove('bgGrey');

    btnPotAlien.classList.add('bgGrey');
    btnBoostAlien.classList.add('bgGrey');

    document.querySelector('.btnAttAlien').disabled = true;
    document.querySelector('.btnDefAlien').disabled = true;
    document.querySelector('.btnAttAstro').disabled = false;
    document.querySelector('.btnDefAstro').disabled = false;

    document.querySelector('.btnPotAlien').disabled = true;
    document.querySelector('.btnBoostAlien').disabled = true;

    if (astroIsHealed == false) {
        btnPotAstro.classList.remove('bgGrey');
        document.querySelector('.btnPotAstro').disabled = false
    };

    if (astroIsBoost == false) {
        btnBoostAstro.classList.remove('bgGrey');
        document.querySelector('.btnBoostAstro').disabled = false
    };
    
    if (isDefAstro == true) {
        btnDefAstro.classList.add('bgGrey');
        document.querySelector('.btnDefAstro').disabled = true
    };

};

function disableBtnAstro() {
    btnAttAstro.classList.add('bgGrey');
    btnDefAstro.classList.add('bgGrey');
    btnAttAlien.classList.remove('bgGrey');
    btnDefAlien.classList.remove('bgGrey');

    btnPotAstro.classList.add('bgGrey');
    btnBoostAstro.classList.add('bgGrey');

    document.querySelector('.btnAttAstro').disabled = true;
    document.querySelector('.btnDefAstro').disabled = true;
    document.querySelector('.btnAttAlien').disabled = false;
    document.querySelector('.btnDefAlien').disabled = false;

    document.querySelector('.btnPotAstro').disabled = true;
    document.querySelector('.btnBoostAstro').disabled = true;

    if(alienIsHealed == false) {
        btnPotAlien.classList.remove('bgGrey')
        document.querySelector('.btnPotAlien').disabled = false
    }

    if(alienIsBoost == false) {
        btnBoostAlien.classList.remove('bgGrey')
        document.querySelector('.btnBoostAlien').disabled = false
    }

    if (isDefAlien == true) {
        btnDefAlien.classList.add('bgGrey');
        document.querySelector('.btnDefAlien').disabled = true
    };
};

function endGame(persoMort, persoWinner) {
    alert("L'" + persoMort + " est mort, l'" + persoWinner + " à gagné ! \n \nC'est donc au perdant, qui est l'" + persoMort + ", de commencer la prochaine partie.");
    
    pvAlien.value = 100;
    pvAstro.value = 100;
    
    astroIsHealed = false;
    alienIsHealed = false;

    astroIsBoost = false;
    astroBoostIsUsed = false;
    alienIsBoost = false;
    alienBoostIsUsed = false;
};

function soins(pvPerso) {
    pvPerso.value = +pvPerso.value + 20
};

function animImg(img) {
    img.classList.add('attaque');
    setTimeout(function() {
        img.classList.remove('attaque');
    }, 500);
};

function degatsSubis(perso) {
    perso.value = -att + ' pv';
    perso.classList.add('affichageDegats')
    setTimeout(function() {
        perso.classList.remove('affichageDegats');
    }, 1000);
};

function soinsSubis(perso) {
    perso.value = '+' + 20 + ' pv';
    perso.classList.add('affichageDegats')
    setTimeout(function() {
        perso.classList.remove('affichageDegats');
    }, 1000);
};

// Définition aléatoire du personnage qui commence à jouer

var random = Math.floor(getRandomArbitrary(0,2))

if (random == 0) {
    disableBtnAlien();
} else {
    disableBtnAstro();
}

// Écoute des boutons

// Boutons de l'Alien

btnAttAlien.addEventListener('click', function() {

    att = Math.floor(getRandomArbitrary(10, 21));
    
    if (alienIsBoost == true) {
        if (alienBoostIsUsed == false) {
            att *= 2;
            alienBoostIsUsed = true;
        }
    };
    
    if(isDefAstro == false) {
    
        if(pvAstro.value - att < 0) {
            pvAstro.value = 0;
            endGame("Astronaute" , "Alien");
        } else {
            pvAstro.value -= att;
            degatsSubis(degSubisAstro)
    
            animImg(imgGriffe)
        };
    
    };

    isDefAstro = false;
    disableBtnAlien();

});

btnDefAlien.addEventListener('click', function() {
    isDefAlien = true;
    disableBtnAlien();
});

btnPotAlien.addEventListener('click', function() {
    if (alienIsHealed == false) {
        soins(pvAlien);
        alienIsHealed = true;
        disableBtnAlien();
        soinsSubis(degSubisAlien)
    };
});

btnBoostAlien.addEventListener('click', function() {
    if (alienIsBoost == false) {
        if (alienBoostIsUsed == false) {
            alienIsBoost = true;
            disableBtnAlien();
        };
    };
});

// Boutons de l'Astonaute

btnAttAstro.addEventListener('click', function() {
    
    att = Math.floor(getRandomArbitrary(10, 21));
    
    if (astroIsBoost == true) {
    
        if (astroBoostIsUsed == false) {
            att *= 2;
            astroBoostIsUsed = true;
        };
    
    };
    
    if(isDefAlien == false) {
    
        if(pvAlien.value - att <= 0) {
            pvAlien.value = 0;
            endGame("Alien","Astronaute");
        } else {
            pvAlien.value -= att;
            degatsSubis(degSubisAlien)
            animImg(imgPoing)
        };
    
    };  
    
    isDefAlien = false;
    disableBtnAstro();

});

btnDefAstro.addEventListener('click', function() {
    isDefAstro = true;
    disableBtnAstro();
});

btnPotAstro.addEventListener('click', function() {
    if(astroIsHealed == false) {
        soins(pvAstro);
        astroIsHealed = true;
        disableBtnAstro();
        soinsSubis(degSubisAstro)
    };
});

btnBoostAstro.addEventListener('click', function() {
    if (astroIsBoost == false) {
        if (astroBoostIsUsed == false) {
            astroIsBoost = true;
            disableBtnAstro();
        };
    };
});