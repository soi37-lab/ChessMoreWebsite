document.addEventListener("DOMContentLoaded", () => {
    const membersContainer = document.getElementById("members-container");
    const searchBar = document.getElementById("search-bar");

    // Fetch member data
    fetch("data/members.json")
        .then(response => response.json())
        .then(data => {
            displayMembers(data);

            // Add search functionality
            searchBar.addEventListener("input", () => {
                const filteredMembers = data.filter(member =>
                    member.name.toLowerCase().includes(searchBar.value.toLowerCase()) ||
                    member.rank.toString().includes(searchBar.value)
                );
                displayMembers(filteredMembers);
            });
        })
        .catch(error => console.error("Error loading members:", error));

    // Function to display members
    function displayMembers(members) {
        membersContainer.innerHTML = ""; // Clear existing content
        members.forEach(member => {
            const memberCard = document.createElement("div");
            memberCard.classList.add("member-card");
            memberCard.innerHTML = `
                <img src="${member.photo}" alt="${member.name}" class="member-photo">
                <h2>${member.name}</h2>
                <p><strong>Rank:</strong> ${member.rank}</p>
                <p><strong>Title:</strong> ${member.title}</p>
                <p>${member.bio}</p>
            `;
            membersContainer.appendChild(memberCard);
        });
    }
});
