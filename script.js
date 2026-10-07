function startJournal() {
    window.location.href = "journal.html";
}

function viewMood() {
    alert("Mood tracker will be available soon.");
}

let selectedMood = "";

function selectMood(mood) {
    selectedMood = mood;

    document.getElementById("selectedMood").textContent =
        "Selected mood: " + mood;
}

function saveEntry() {
    const date = document.getElementById("journalDate").value;
    const text = document.getElementById("journalText").value;

    if (date === "") {
        alert("Please select a date.");
        return;
    }

    if (selectedMood === "") {
        alert("Please select your mood.");
        return;
    }

    if (text.trim() === "") {
        alert("Please write something in your journal.");
        return;
    }

    const entry = {
        date: date,
        mood: selectedMood,
        text: text
    };

    let entries =
        JSON.parse(localStorage.getItem("journalEntries")) || [];

    entries.push(entry);

    localStorage.setItem(
        "journalEntries",
        JSON.stringify(entries)
    );

    alert("Your journal entry has been saved. 🌿");

    document.getElementById("journalText").value = "";
    selectedMood = "";

    document.getElementById("selectedMood").textContent =
        "No mood selected";

    displayEntries();
}

function displayEntries() {
    const entriesContainer =
        document.getElementById("entries");

    if (!entriesContainer) {
        return;
    }

    const entries =
        JSON.parse(localStorage.getItem("journalEntries")) || [];

    if (entries.length === 0) {
        entriesContainer.innerHTML =
            '<p class="empty-message">Your saved journal entries will appear here.</p>';
        return;
    }

    entriesContainer.innerHTML = "";

    entries.slice().reverse().forEach(function(entry) {

        const entryDiv = document.createElement("div");

        entryDiv.className = "entry";

        entryDiv.innerHTML = `
            <div class="entry-date">${entry.date}</div>
            <div class="entry-mood">${entry.mood}</div>
            <div class="entry-text">${entry.text}</div>
        `;

        entriesContainer.appendChild(entryDiv);
    });
}

displayEntries();
/* MOOD TRACKER */

let selectedMoods = [];

document.querySelectorAll(".mood-option").forEach(function(button) {

    button.addEventListener("click", function() {

        const mood = this.getAttribute("data-mood");

        if (selectedMoods.includes(mood)) {

            selectedMoods = selectedMoods.filter(function(item) {
                return item !== mood;
            });

            this.classList.remove("selected");

        } else {

            selectedMoods.push(mood);

            this.classList.add("selected");
        }
    });
});


function saveMood() {

    const date = document.getElementById("moodDate").value;
    const note = document.getElementById("moodNote").value;

    if (date === "") {
        alert("Please select a date.");
        return;
    }

    if (selectedMoods.length === 0) {
        alert("Please select at least one mood.");
        return;
    }

    const moodEntry = {
        date: date,
        moods: selectedMoods,
        note: note
    };

    let moodEntries =
        JSON.parse(localStorage.getItem("moodEntries")) || [];

    moodEntries.push(moodEntry);

    localStorage.setItem(
        "moodEntries",
        JSON.stringify(moodEntries)
    );

    alert("Your mood has been saved. 🌿");

    document.getElementById("moodNote").value = "";

    document.querySelectorAll(".mood-option").forEach(function(button) {
        button.classList.remove("selected");
    });

    selectedMoods = [];

    displayMoodEntries();
}


function displayMoodEntries() {

    const container =
        document.getElementById("moodEntries");

    if (!container) {
        return;
    }

    const moodEntries =
        JSON.parse(localStorage.getItem("moodEntries")) || [];

    if (moodEntries.length === 0) {
        container.innerHTML =
            '<p class="empty-message">Your mood records will appear here.</p>';
        return;
    }

    container.innerHTML = "";

    moodEntries.slice().reverse().forEach(function(entry) {

        const div = document.createElement("div");

        div.className = "mood-entry";

        div.innerHTML = `
            <div class="mood-entry-date">${entry.date}</div>
            <div class="mood-entry-moods">${entry.moods.join(" • ")}</div>
            <div class="mood-entry-note">${entry.note || "No note added."}</div>
        `;

        container.appendChild(div);
    });
}


displayMoodEntries();