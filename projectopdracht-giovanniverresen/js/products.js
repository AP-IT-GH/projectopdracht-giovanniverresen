

// 1. We maken een variabele 'onzeProductenLijst'.
// We zetten hem op 'window' zodat cart.js er ook bij kan!
window.onzeProductenLijst = [];

// 2. We luisteren of de browser klaar is met laden.
// Pas als alles er is, beginnen we met onze code.
window.onload = function () {
    console.log("De website is geladen, we gaan beginnen!");
    haalProductenOpVanServer();
};


async function haalProductenOpVanServer() {
    try {
        // STAP A: Vraag het bestand 'products.json' op
        console.log("We vragen de producten op...");
        let hetAntwoord = await fetch('products.json');

        // STAP B: De computer moet de tekst omzetten naar echte data (JSON)
        let deData = await hetAntwoord.json();

        // STAP C: We stoppen het in onze lijst
        window.onzeProductenLijst = deData;
        console.log("Gelukt! We hebben " + window.onzeProductenLijst.length + " producten.");

        // STAP D: Nu kunnen we ze op het scherm tekenen
        tekenDeBlokjesOpHetScherm();

    } catch (foutmelding) {
        
        console.log("Er ging iets mis: " + foutmelding);
    }
}


function tekenDeBlokjesOpHetScherm() {
 

    let hetRooster = document.getElementById('best-seller-grid');

    // Als we hem niet vinden, proberen we de andere naam
    if (hetRooster == null) {
        hetRooster = document.getElementById('product-grid');
    }

    // Als we hem NOG niet vinden, zijn we waarschijnlijk op Contact, dus stoppen we.
    if (hetRooster == null) {
        return;
    }

    // Eerst maken we het vak leeg, voor de zekerheid
    hetRooster.innerHTML = "";

    // Hoeveel producten laten we zien?
    let aantalOmTeTonen = window.onzeProductenLijst.length;

    
    if (hetRooster.id == 'best-seller-grid') {
        aantalOmTeTonen = 3;
    }

    
    for (letnummer = 0; letnummer < aantalOmTeTonen; letnummer++) {

        
        let ditProduct = window.onzeProductenLijst[letnummer];

       
        let htmlCode = `
            <div class="product-card">
                <div class="card-image-container">
                    <img src="${ditProduct.image}" alt="${ditProduct.name}">
                    
                    <!-- Harte knopje -->
                    <button class="product-wishlist-btn" onclick="toggleVerlangLijst(${ditProduct.id})" title="Bewaar voor later">
                        ❤️
                    </button>
                    
                    <!-- Winkelwagen knopje -->
                    <button class="product-add-btn" onclick="stopInWinkelmandje(${ditProduct.id})" title="Koop dit!">
                        🛒
                    </button>
                </div>
                <div class="card-content">
                    <div class="product-title">${ditProduct.name}</div>
                    <div class="product-price">${ditProduct.price} GP</div>
                </div>
            </div>
        `;

        
        hetRooster.innerHTML = hetRooster.innerHTML + htmlCode;
    }
}
