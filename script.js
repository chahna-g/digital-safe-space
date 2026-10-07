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