const API_KEY = ""; //miejsce na klucz api

document.getElementById("pogodaBtn").addEventListener("click", () => {
    const miasto = document.getElementById("name").value;
    if (!miasto) return alert("Wpisz nazwę miasta!");

    const currentBox = document.getElementById("current-weather");
    const holdery = document.querySelectorAll(".holder");

    const xhr = new XMLHttpRequest();
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${miasto}&appid=${API_KEY}&units=metric&lang=pl`;

    xhr.open("GET", currentUrl, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const currentData = JSON.parse(xhr.responseText);

            const icon = currentData.weather[0].icon;
            console.log("Odpowiedź z API (current):", currentData);
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            currentBox.innerHTML = "";
            const container = document.createElement("div");
            container.style.display = "flex";
            container.style.alignItems = "center";
            container.style.gap = "20px";

            const img = document.createElement("img");
            img.src = iconUrl;
            img.width = 80;
            img.height = 80;
            container.appendChild(img);
            const textBox = document.createElement("div");

            const title = document.createElement("h2");
            title.textContent = `Aktualna pogoda w ${currentData.name}`;
            textBox.appendChild(title);

            const opis = document.createElement("p");
            opis.style.fontSize = "18px";
            opis.style.margin = "5px 0";
            opis.innerHTML = `<strong>${currentData.main.temp}°C</strong>, ${currentData.weather[0].description}`;
            textBox.appendChild(opis);

            const wilgotnosc = document.createElement("p");
            wilgotnosc.textContent = `Wilgotność: ${currentData.main.humidity}%`;
            textBox.appendChild(wilgotnosc);

            const wiatr = document.createElement("p");
            wiatr.textContent = `Wiatr: ${currentData.wind.speed} m/s`;
            textBox.appendChild(wiatr);
            container.appendChild(textBox);
            currentBox.appendChild(container);
            currentBox.style.display = "flex"; // pokaż aktualną pogodę
        } else {
            alert("Nie udało się pobrać aktualnej pogody!");
        }
    };
    xhr.send();

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${miasto}&appid=${API_KEY}&units=metric&lang=pl`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Odpowiedź z API (forecast):", data);
            const dni = {};
            data.list.forEach(item => {
                const dataDnia = item.dt_txt.split(" ")[0];
                if (!dni[dataDnia]) dni[dataDnia] = [];
                dni[dataDnia].push(item);
            });
            const daty = Object.keys(dni);
            holdery.forEach(h => h.innerHTML = "");

            daty.slice(0, holdery.length).forEach((dataDnia, index) => {
                const holder = holdery[index];
                let html = `<h3>${dataDnia}</h3>`;

                dni[dataDnia].forEach(entry => {
                    const icon = entry.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

                    html += `
                        <div style="margin-bottom:12px; display:flex; align-items:center; gap:10px; line-height:1.5;">
                            <img src="${iconUrl}" width="38" height="38" alt="ikona pogody">

                            <div>
                                <strong>${entry.dt_txt.split(" ")[1]}</strong> – 
                                ${entry.main.temp}°C<br>
                                ${entry.weather[0].description}
                            </div>
                        </div>
                    `;
                });

                holder.innerHTML = html;
                holder.style.display = "block"; // pokaż holder
            });
        })
        .catch(err => {
            alert("Nie udało się pobrać prognozy 5 dni!");
            console.error(err);
        });
});
