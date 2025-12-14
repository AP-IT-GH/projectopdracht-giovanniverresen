

let mijnVerlangLijstje = [];


if (localStorage.getItem('mijnOpgeslagenWishlist')) {
    let tekst = localStorage.getItem('mijnOpgeslagenWishlist');
    mijnVerlangLijstje = JSON.parse(tekst);
}

window.addEventListener('load', function () {
    updateVerlanglijstScherm();
    maakHartjeKnopWerkend();
});



function toggleVerlangLijst(productId) {
    console.log("Hartje geklikt! ID: " + productId);

    let hetProduct = null;
    for (let i = 0; i < window.onzeProductenLijst.length; i++) {
        if (window.onzeProductenLijst[i].id == productId) {
            hetProduct = window.onzeProductenLijst[i];
        }
    }

    if (hetProduct == null) return;

    
    let zitErin = false;
    let waarZitHij = -1;

    for (let i = 0; i < mijnVerlangLijstje.length; i++) {
        if (mijnVerlangLijstje[i].id == productId) {
            zitErin = true;
            waarZitHij = i; 
        }
    }

    if (zitErin) {
      
        mijnVerlangLijstje.splice(waarZitHij, 1);

        
        alert("Jammer, " + hetProduct.name + " is van je lijstje! 💔");
    } else {
        
        let nieuwFavo = {
            id: hetProduct.id,
            name: hetProduct.name,
            image: hetProduct.image
        };
        mijnVerlangLijstje.push(nieuwFavo);

        
        alert("Leuk! " + hetProduct.name + " staat op je verlanglijst! ❤️");
    }

    
    slaWishlistOp();
    updateVerlanglijstScherm();

    
    let paneel = document.getElementById('wishlist-panel');
    if (paneel) {
        paneel.scrollIntoView({ behavior: 'smooth' });
    }
}



function updateVerlanglijstScherm() {

   
    let teller = document.getElementById('wishlist-count');
    if (teller) {
        teller.innerText = mijnVerlangLijstje.length;
    }

    
    let paneelElement = document.getElementById('wishlist-items');

    if (paneelElement) {
        paneelElement.innerHTML = "";

        if (mijnVerlangLijstje.length == 0) {
            paneelElement.innerHTML = "<p>Nog geen favorieten. Klik op een hartje! ❤️</p>";
        }

        for (let i = 0; i < mijnVerlangLijstje.length; i++) {
            let item = mijnVerlangLijstje[i];

           
            paneelElement.innerHTML += `
                <div class="wishlist-item" style="margin-bottom: 10px; display:flex; align-items:center; gap:10px;">
                    <img src="${item.image}" style="width:50px; height:50px; object-fit:cover;">
                    <div style="flex:1;">
                        <b>${item.name}</b>
                    </div>
                    <button onclick="toggleVerlangLijst(${item.id})" style="color:red; cursor:pointer; border:none; background:none;">❌</button>
                </div>
            `;
        }
    }
}


function slaWishlistOp() {
    let tekst = JSON.stringify(mijnVerlangLijstje);
    localStorage.setItem('mijnOpgeslagenWishlist', tekst);
}

function maakHartjeKnopWerkend() {
    let knop = document.getElementById('wishlist-toggle');
    if (knop) {
        knop.onclick = function (e) {
            e.preventDefault();
            window.location.href = 'shop.html';
        };
    }
}
