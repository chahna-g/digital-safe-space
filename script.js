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
/* CALENDAR */


/* Current calendar date */

let calendarDate = new Date();

let selectedCalendarDate = null;


/* Load calendar */

function loadCalendar() {

    const calendarDays =
        document.getElementById("calendarDays");

    if (!calendarDays) {
        return;
    }

    const monthYear =
        document.getElementById("monthYear");

    const year = calendarDate.getFullYear();

    const month = calendarDate.getMonth();


    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    monthYear.textContent =
        monthNames[month] + " " + year;


    calendarDays.innerHTML = "";


    const firstDay =
        new Date(year, month, 1).getDay();


    const daysInMonth =
        new Date(year, month + 1, 0).getDate();


    /* Empty spaces before first day */

    for (let i = 0; i < firstDay; i++) {

        const emptyDay =
            document.createElement("div");

        emptyDay.className =
            "calendar-day empty";

        calendarDays.appendChild(emptyDay);
    }


    /* Create days */

    for (let day = 1; day <= daysInMonth; day++) {

        const dayElement =
            document.createElement("div");

        dayElement.className =
            "calendar-day";


        const dayNumber =
            document.createElement("div");

        dayNumber.className =
            "day-number";

        dayNumber.textContent = day;


        dayElement.appendChild(dayNumber);


        const dateString =
            formatDate(
                new Date(year, month, day)
            );


        /* Today's date */

        const today =
            formatDate(new Date());


        if (dateString === today) {

            dayElement.classList.add("today");

        }


        /* Activity indicators */

        const indicators =
            document.createElement("div");

        indicators.className =
            "day-indicators";


        const journals =
            JSON.parse(
                localStorage.getItem("journalEntries")
            ) || [];


        const moods =
            JSON.parse(
                localStorage.getItem("moodEntries")
            ) || [];


        const reminders =
            JSON.parse(
                localStorage.getItem("reminders")
            ) || [];


        const hasJournal =
            journals.some(
                entry => entry.date === dateString
            );


        const hasMood =
            moods.some(
                entry => entry.date === dateString
            );


        const hasReminder =
            reminders.some(
                entry => entry.date === dateString
            );


        if (hasJournal) {
            indicators.textContent += " 📝";
        }

        if (hasMood) {
            indicators.textContent += " 😊";
        }

        if (hasReminder) {
            indicators.textContent += " ⏰";
        }


        dayElement.appendChild(indicators);


        /* Click date */

        dayElement.addEventListener(
            "click",
            function() {

                selectedCalendarDate =
                    dateString;

                document
                    .querySelectorAll(".calendar-day")
                    .forEach(
                        d => d.classList.remove("selected")
                    );

                dayElement.classList.add("selected");

                showDateInformation(dateString);

            }
        );


        calendarDays.appendChild(dayElement);

    }

}


/* Format date */

function formatDate(date) {

    const year =
        date.getFullYear();

    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;

}


/* Change month */

function changeMonth(amount) {

    calendarDate.setMonth(
        calendarDate.getMonth() + amount
    );

    loadCalendar();

}


/* Go to today */

function goToToday() {

    calendarDate =
        new Date();

    loadCalendar();

}


/* Show selected date */

function showDateInformation(date) {

    const title =
        document.getElementById(
            "selectedDateTitle"
        );

    const content =
        document.getElementById(
            "selectedDateContent"
        );


    if (!title || !content) {
        return;
    }


    title.textContent =
        "📅 " + date;


    const journals =
        JSON.parse(
            localStorage.getItem("journalEntries")
        ) || [];


    const moods =
        JSON.parse(
            localStorage.getItem("moodEntries")
        ) || [];


    const reminders =
        JSON.parse(
            localStorage.getItem("reminders")
        ) || [];


    const journalResults =
        journals.filter(
            entry => entry.date === date
        );


    const moodResults =
        moods.filter(
            entry => entry.date === date
        );


    const reminderResults =
        reminders.filter(
            entry => entry.date === date
        );


    let html = "";


    /* Journal */

    journalResults.forEach(
        entry => {

            html += `
                <div class="history-item">

                    <h3>📝 Journal</h3>

                    <p>
                        ${entry.text}
                    </p>

                </div>
            `;

        }
    );


    /* Mood */

    moodResults.forEach(
        entry => {

            html += `
                <div class="history-item">

                    <h3>😊 Mood</h3>

                    <p>
                        ${entry.moods.join(" • ")}
                    </p>

                    <p>
                        ${entry.note || ""}
                    </p>

                </div>
            `;

        }
    );


    /* Reminder */

    reminderResults.forEach(
        entry => {

            html += `
                <div class="history-item">

                    <h3>⏰ Reminder</h3>

                    <p>
                        ${entry.title}
                    </p>

                    <p>
                        ${entry.time}
                    </p>

                </div>
            `;

        }
    );


    if (html === "") {

        html = `
            <p class="empty-message">
                Nothing has been recorded for this date yet.
            </p>
        `;

    }


    content.innerHTML = html;

}


/* Save reminder */

function saveReminder() {

    const title =
        document.getElementById(
            "reminderTitle"
        ).value.trim();


    const date =
        document.getElementById(
            "reminderDate"
        ).value;


    const time =
        document.getElementById(
            "reminderTime"
        ).value;


    const repeat =
        document.getElementById(
            "reminderRepeat"
        ).value;


    if (!title) {

        alert(
            "Please enter a reminder."
        );

        return;
    }


    if (!date) {

        alert(
            "Please select a date."
        );

        return;
    }


    if (!time) {

        alert(
            "Please select a time."
        );

        return;
    }


    const reminder = {

        title: title,

        date: date,

        time: time,

        repeat: repeat

    };


    let reminders =
        JSON.parse(
            localStorage.getItem("reminders")
        ) || [];


    reminders.push(reminder);


    localStorage.setItem(
        "reminders",
        JSON.stringify(reminders)
    );


    alert(
        "Reminder saved successfully! ⏰"
    );


    document.getElementById(
        "reminderTitle"
    ).value = "";


    document.getElementById(
        "reminderDate"
    ).value = "";


    document.getElementById(
        "reminderTime"
    ).value = "";


    loadCalendar();

    displayReminders();

    displayHistory();

}


/* Upcoming reminders */

function displayReminders() {

    const container =
        document.getElementById(
            "upcomingReminders"
        );


    if (!container) {
        return;
    }


    const reminders =
        JSON.parse(
            localStorage.getItem("reminders")
        ) || [];


    if (reminders.length === 0) {

        container.innerHTML =
            `
            <p class="empty-message">
                No upcoming reminders.
            </p>
            `;

        return;
    }


    container.innerHTML = "";


    reminders
        .slice()
        .sort(
            (a, b) =>
                `${a.date} ${a.time}`
                    .localeCompare(
                        `${b.date} ${b.time}`
                    )
        )
        .forEach(
            reminder => {

                const div =
                    document.createElement(
                        "div"
                    );

                div.className =
                    "reminder-item";


                div.innerHTML = `

                    <h3>
                        ⏰ ${reminder.title}
                    </h3>

                    <div class="reminder-date">

                        ${reminder.date}
                        at
                        ${reminder.time}

                    </div>

                    <p>
                        Repeat:
                        ${reminder.repeat}
                    </p>

                `;


                container.appendChild(div);

            }
        );

}


/* History */

function displayHistory() {

    const container =
        document.getElementById(
            "history"
        );


    if (!container) {
        return;
    }


    const journals =
        JSON.parse(
            localStorage.getItem("journalEntries")
        ) || [];


    const moods =
        JSON.parse(
            localStorage.getItem("moodEntries")
        ) || [];


    const reminders =
        JSON.parse(
            localStorage.getItem("reminders")
        ) || [];


    let history = [];


    journals.forEach(
        entry => {

            history.push({

                date: entry.date,

                title: "📝 Journal Entry",

                content: entry.text

            });

        }
    );


    moods.forEach(
        entry => {

            history.push({

                date: entry.date,

                title: "😊 Mood",

                content:
                    entry.moods.join(" • ")

            });

        }
    );


    reminders.forEach(
        entry => {

            history.push({

                date: entry.date,

                title: "⏰ Reminder",

                content: entry.title

            });

        }
    );


    history.sort(
        (a, b) =>
            b.date.localeCompare(a.date)
    );


    if (history.length === 0) {

        container.innerHTML =
            `
            <p class="empty-message">
                Your previous activity will appear here.
            </p>
            `;

        return;

    }


    container.innerHTML = "";


    history.forEach(
        item => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "history-item";


            div.innerHTML = `

                <h3>
                    ${item.title}
                </h3>

                <div class="history-date">
                    ${item.date}
                </div>

                <p>
                    ${item.content}
                </p>

            `;


            container.appendChild(div);

        }
    );

}


/* Load calendar features */

loadCalendar();

displayReminders();

displayHistory();