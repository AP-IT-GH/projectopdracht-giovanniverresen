


let inhoudWinkelwagen = [];


if (localStorage.getItem('mijnOpgeslagenWinkelwagen')) {
    
    let tekstUitGeheugen = localStorage.getItem('mijnOpgeslagenWinkelwagen');
    
    inhoudWinkelwagen = JSON.parse(tekstUitGeheugen);
}


window.addEventListener('load', function () {
    tekenHetWinkelmandje();
    activeerNavigatieKnoppen();
});



function stopInWinkelmandje(productId) {
    
    let hetGekozenProduct = null;
    for (let i = 0; i < window.onzeProductenLijst.length; i++) {
        if (window.onzeProductenLijst[i].id == productId) {
            hetGekozenProduct = window.onzeProductenLijst[i];
        }
    }

    if (hetGekozenProduct == null) {
        console.log("Kon product " + productId + " niet vinden!");
        return;
    }

    
    let bestelling = null;
    for (let j = 0; j < inhoudWinkelwagen.length; j++) {
        if (inhoudWinkelwagen[j].id == productId) {
            bestelling = inhoudWinkelwagen[j];
        }
    }

    if (bestelling != null) {
        
        bestelling.aantal = bestelling.aantal + 1;
    } else {
       
        let nieuwItem = {
            id: hetGekozenProduct.id,
            name: hetGekozenProduct.name,
            price: hetGekozenProduct.price,
            image: hetGekozenProduct.image,
            aantal: 1
        };
        inhoudWinkelwagen.push(nieuwItem);
    }

    
    slaOpVoorLater();

    
    tekenHetWinkelmandje();

    
    Toastify({
        text: "Hoera! " + hetGekozenProduct.name + " zit in je mandje! 🛒",
        duration: 3000, 
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}



function haalUitWinkelmandje(productId) {
    
    let nieuweLijst = [];

    
    for (let i = 0; i < inhoudWinkelwagen.length; i++) {
        if (inhoudWinkelwagen[i].id != productId) {
            nieuweLijst.push(inhoudWinkelwagen[i]);
        }
    }

    
    inhoudWinkelwagen = nieuweLijst;

    slaOpVoorLater();
    tekenHetWinkelmandje();
}


function maakAllesLeeg() {
    
    if (confirm("Weet je zeker dat je ALLES wilt weggooien?")) {
        inhoudWinkelwagen = []; 
        slaOpVoorLater();
        tekenHetWinkelmandje();

        Toastify({
            text: "Poef! Mandje is leeg. 🗑️",
            style: { background: "#c0392b" }
        }).showToast();
    }
}





function tekenHetWinkelmandje() {

    
    let totaalAantalProducten = 0;
    for (let i = 0; i < inhoudWinkelwagen.length; i++) {
        totaalAantalProducten = totaalAantalProducten + inhoudWinkelwagen[i].aantal;
    }

    
    let tellerElement = document.getElementById('cart-count');
    if (tellerElement) {
        tellerElement.innerText = totaalAantalProducten;
    }

   
    let lijstOpScherm = document.getElementById('cart-items');

    
    if (lijstOpScherm) {
        lijstOpScherm.innerHTML = ""; 

        let totaalBedrag = 0;

        if (inhoudWinkelwagen.length == 0) {
            lijstOpScherm.innerHTML = "<p>Je mandje is nog leeg.</p>";
        }

     
        for (let i = 0; i < inhoudWinkelwagen.length; i++) {
            let item = inhoudWinkelwagen[i];

         
            let regelPrijs = item.price * item.aantal;
            totaalBedrag = totaalBedrag + regelPrijs;

           
            lijstOpScherm.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" style="width:50px; height:50px;">
                    <div>
                        <b>${item.name}</b> (${item.aantal}x)<br>
                        Prijs: ${regelPrijs.toFixed(2)} GP
                    </div>
                    <button onclick="haalUitWinkelmandje(${item.id})" class="cart-remove-item-btn">❌</button>
                </div>
            `;
        }

       
        let nettoPrijs = totaalBedrag / 1.21;
        let deBtw = totaalBedrag - nettoPrijs;

     
        let totaalVeld = document.getElementById('cart-total-price');
        let nettoVeld = document.getElementById('cart-netto');
        let btwVeld = document.getElementById('cart-vat');

        if (totaalVeld) totaalVeld.innerText = "Totaal: " + totaalBedrag.toFixed(2) + " GP";
        if (nettoVeld) nettoVeld.innerText = "Netto: " + nettoPrijs.toFixed(2) + " GP";
        if (btwVeld) btwVeld.innerText = "BTW (21%): " + deBtw.toFixed(2) + " GP";


     
        let leegmaakKnop = document.querySelector('.cart-clear-btn');
        if (leegmaakKnop) leegmaakKnop.onclick = maakAllesLeeg;
    }
}


/**
 * HULPFUNCTIES
 */
function slaOpVoorLater() {
    // We zetten de lijst om naar tekst
    let tekstVoorOpslag = JSON.stringify(inhoudWinkelwagen);
    // En bewaren het onder een sleutel in de browser
    localStorage.setItem('mijnOpgeslagenWinkelwagen', tekstVoorOpslag);
}

function activeerNavigatieKnoppen() {
    let knop = document.getElementById('cart-toggle');
    if (knop) {
        knop.onclick = function (e) {
            e.preventDefault();
            // Als we niet op de shop zijn, gaan we erheen
            window.location.href = 'shop.html';
        };
    }
}
