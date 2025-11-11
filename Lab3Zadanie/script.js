window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => {
                console.log("Geolocation allowed:", pos.coords.latitude, pos.coords.longitude);
                map.setView([pos.coords.latitude, pos.coords.longitude], 18);
                const userMarker = L.marker([pos.coords.latitude, pos.coords.longitude])
                    .addTo(map)
                    .bindPopup("Your Location")
                    .openPopup();
            },
            err => console.warn("Geolocation denied or error:", err)
        );
    } else {
        console.warn("Geolocation not supported by this browser.");
    }

    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
            console.log("Notification permission:", permission);
        });
    }
};

let map = L.map('map').setView([53.430127, 14.564802], 18);
L.tileLayer.provider('Esri.WorldImagery').addTo(map);

document.getElementById("getLocation").addEventListener("click", () => {
    if (!navigator.geolocation) { alert("Geolocation not supported."); return; }
    navigator.geolocation.getCurrentPosition(pos => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;
        map.setView([lat, lon], 18);
        L.marker([lat, lon]).addTo(map).bindPopup("Your Location").openPopup();
    });
});

document.getElementById("createPuzzle").addEventListener("click", () => {

    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            layer._icon.style.display = 'none';
        }
    });

    leafletImage(map, function(err, canvas) {
        const rasterMap = document.getElementById("rasterMap");
        const ctx = rasterMap.getContext("2d");
        ctx.drawImage(canvas, 0, 0, rasterMap.width, rasterMap.height);

        createTiles();

        map.eachLayer(layer => {
            if (layer instanceof L.Marker) {
                layer._icon.style.display = '';
            }
        });
    });
});

function createTiles() {
    const rasterMap = document.getElementById("rasterMap");
    const puzzleArea = document.getElementById("puzzle-area");
    puzzleArea.innerHTML = '';

    const rows = 4, cols = 4;
    const tileWidth = rasterMap.width / cols;
    const tileHeight = rasterMap.height / rows;

    const tiles = [];

    for (let i = 0; i < rows * cols; i++) {
        const target = document.createElement("div");
        target.classList.add("drag-target");
        target.dataset.index = i;
        puzzleArea.appendChild(target);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const tile = document.createElement("canvas");
            tile.width = tileWidth;
            tile.height = tileHeight;
            const tCtx = tile.getContext("2d");
            tCtx.drawImage(rasterMap, c*tileWidth, r*tileHeight, tileWidth, tileHeight, 0,0, tileWidth, tileHeight);

            tile.classList.add("tile");
            tile.setAttribute("draggable", true);
            tile.dataset.index = r*cols+c;
            tiles.push(tile);
        }
    }

    tiles.sort(() => Math.random() - 0.5);

    const bottomContainer = document.getElementById("tile-container");
    bottomContainer.innerHTML = '';
    tiles.forEach(tile => bottomContainer.appendChild(tile));

    let dragged = null;
    tiles.forEach(tile => {
        tile.addEventListener("dragstart", e => dragged = tile);
        tile.addEventListener("dragend", e => dragged = null);
    });

    const targets = document.querySelectorAll(".drag-target");
    targets.forEach(target => {
        target.addEventListener("dragover", e => e.preventDefault());
        target.addEventListener("drop", e => {
            e.preventDefault();
            if (!dragged) return;

            const existing = target.firstChild;
            const parentOfDragged = dragged.parentNode;

            if (existing) {
                parentOfDragged.appendChild(existing);
            }

            target.appendChild(dragged);
            checkSolution();
        });
    });
}

function checkSolution() {
    const targets = document.querySelectorAll(".drag-target");
    let correct = true;
    targets.forEach((t, i) => {
        if (!t.firstChild || parseInt(t.firstChild.dataset.index) !== i) correct = false;
    });
    if (correct){
        showNotification("Gratulacje!", "Puzzle zostały ułożone poprawnie :)");
        console.log("Puzzle ulozone poprawnie!");
    } 
}

function showNotification(title, body) {
    if (!("Notification" in window)) {
        alert(title + "\n" + body);
        return;
    }

    if (Notification.permission === "granted") {
        new Notification(title, { body });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(title, { body });
            } else {
                alert(title + "\n" + body); 
            }
        });
    } else {
        alert(title + "\n" + body);
    }
}
