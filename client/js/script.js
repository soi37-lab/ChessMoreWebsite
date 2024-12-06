document.addEventListener("DOMContentLoaded", () => {
    // Example: Dynamically populate events
    const events = [
        {
            name: "Club Championship",
            date: "2024-12-10",
            location: "Clubhouse Hall",
            description: "Open to all members."
        },
        {
            name: "Chess Kenya Open",
            date: "2024-12-15",
            location: "National Sports Complex",
            description: "Official event."
        }
    ];

    const eventList = document.getElementById("event-list");
    const ul = eventList.querySelector("ul");

    // Clear existing list items
    ul.innerHTML = "";

    // Populate with events
    events.forEach(event => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>Tournament Name:</strong> ${event.name}<br>
            <strong>Date:</strong> ${event.date}<br>
            <strong>Location:</strong> ${event.location}<br>
            <strong>Description:</strong> ${event.description}<br>
        `;
        ul.appendChild(li);
    });

    // Placeholder for interactive calendar
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "<p>Interactive Calendar Coming Soon!</p>";
});
