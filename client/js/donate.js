// js/donate.js
document.getElementById('donate-form').addEventListener('submit', function (e) {
    const amount = document.getElementById('donation-amount').value;

    if (amount < 1) {
        e.preventDefault();
        alert('Please enter a valid donation amount.');
    }
});
// js/donate.js
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to the clicked tab and corresponding content
            tab.classList.add('active');
            const target = document.getElementById(tab.getAttribute('data-tab'));
            target.classList.add('active');
        });
    });
});
