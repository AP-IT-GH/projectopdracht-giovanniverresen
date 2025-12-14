


window.addEventListener('load', function () {
    startDeKaart();
});

function startDeKaart() {
    
    let kaartVak = document.getElementById('map');
    if (kaartVak == null) {
        
        return;
    }

    console.log("We gaan de kaart tekenen! 🗺️");

    
    let mijnKaart = L.map('map').setView([51.505, -0.09], 25); 

    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mijnKaart);

    
    let toverSpreukIcoon = L.icon({
        iconUrl: './assets/shoplogo/logo.png', 
        iconSize: [25, 25], 
        iconAnchor: [25, 50], 
        popupAnchor: [0, -50]  
    });

  
    let locatie1 = L.marker([51.505, -0.09], { icon: toverSpreukIcoon }).addTo(mijnKaart);
    locatie1.bindPopup("<b>Hoofdkwartier</b><br>Waar de magie begint! ✨");

    // Locatie 2: The Secret Depot (Parijs)
    let locatie2 = L.marker([48.8566, 2.3522], { icon: toverSpreukIcoon }).addTo(mijnKaart);
    locatie2.bindPopup("<b>Geheim Pakhuis</b><br>Niet voor dreuzels. 🤫");

    console.log("Kaart is klaar!");
}
