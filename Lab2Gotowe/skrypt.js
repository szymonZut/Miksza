let x = 0;
class Todo {
    constructor() {
        this.tasks = []; 
        this.lista = document.getElementById("lista");

        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
            this.draw();
        }
        
    }

    saveToLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    addTask(name, date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let selectedDate = null;
        if (date !== "") {
            const [year, month, day] = date.split("-").map(Number);
            selectedDate = new Date(year, month - 1, day);
        }

        if (name.length < 3 || name.length > 255 || (date && selectedDate < today)) {
            alert("Błędne dane!");
            return;
        }
        const lowerName = name.toLowerCase();


        this.tasks.push({ name: lowerName, date });
        this.saveToLocalStorage();
        this.draw();
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
        this.saveToLocalStorage();
        this.draw();
        filterTasks();
    }

    draw() {
        this.lista.innerHTML = ""; 
        const szablon = document.getElementById("szablon");

        this.tasks.forEach((task, i) => {
            const klon = szablon.content.cloneNode(true);
            const nameElement = klon.querySelector(".name");
            const dateElement = klon.querySelector(".date");
            const bin = klon.querySelector(".bin-icon");
            const element = klon.querySelector(".element-listy");

            nameElement.textContent = task.name;
            dateElement.textContent = task.date;
            bin.onclick = () => this.removeTask(i);

            element.onclick = (e) => {
                if (e.target === bin) return;
                if (x != 0) return; 
                
                x = 1;
                const nameInput = document.createElement("input");
                nameInput.type = "text";
                nameInput.classList.add("my-input");
                nameInput.value = nameElement.textContent;
                const dateInput = document.createElement("input");
                dateInput.type = "date";
                dateInput.classList.add("my-input");
                dateInput.value = dateElement.textContent;

                nameElement.parentNode.replaceChild(nameInput, nameElement);
                dateElement.parentNode.replaceChild(dateInput, dateElement);

                nameInput.focus();

                const saveChanges = () => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const newName = nameInput.value.trim();
                    const newDate = dateInput.value;

                    let selectedDate = null;
                    if (newDate !== "") {
                        const [year, month, day] = newDate.split("-").map(Number);
                        selectedDate = new Date(year, month - 1, day);
                    }

                    if (newName.length < 3 || newName.length > 255 || (newDate && selectedDate < today)) {
                        alert("Błędne dane! Nazwa: 3-255 znaków, data: dzisiaj lub przyszłość.");
                        return;
                    }

                    nameElement.textContent = newName;
                    dateElement.textContent = newDate;
                    nameInput.parentNode.replaceChild(nameElement, nameInput);
                    dateInput.parentNode.replaceChild(dateElement, dateInput);

                    task.name = newName.toLowerCase();
                    task.date = newDate;
                    this.saveToLocalStorage();
                    x = 0;
                };

                const checkBlur = () => {
                    setTimeout(() => {
                        if (document.activeElement !== nameInput && document.activeElement !== dateInput) {
                            saveChanges();
                        }
                    }, 0);
                };

                nameInput.addEventListener("blur", checkBlur);
                dateInput.addEventListener("blur", checkBlur);

                nameInput.addEventListener("keydown", (ev) => { if (ev.key === "Enter") saveChanges(); });
                dateInput.addEventListener("keydown", (ev) => { if (ev.key === "Enter") saveChanges(); });
            };

            this.lista.appendChild(klon);
        });
    }
}

const todo = new Todo();


function addTask() {
    const val = document.getElementById("_taskName").value;
    const val2 = document.getElementById("_taskDate").value;

    todo.addTask(val, val2);
}

const searchInput = document.getElementById('search-Input');

function filterTasks() {
    const value = searchInput.value.toLowerCase();
    const lista = document.getElementById("lista");
    const wszystkie = lista.querySelectorAll(".element-listy");

    wszystkie.forEach(el => {
        const nazwaEl = el.querySelector(".name");
        const nazwa = nazwaEl.textContent.toLowerCase();

        if (value.length >= 2) {
            if(nazwa.includes(value)){
                const regex = new RegExp(`(${value})`, "gi"); 
                nazwaEl.innerHTML = nazwa.replace(regex, '<span style="background-color: rgba(34, 40, 49, 0.8);">$1</span>');
                el.style.display = "";
            } else {
                nazwaEl.textContent = nazwa;
                el.style.display = "none";
            }
        } else {
            el.style.display = "";
            nazwaEl.textContent = nazwa;
        }
    });
}
searchInput.addEventListener('input', filterTasks);



