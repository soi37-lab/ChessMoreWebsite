document.addEventListener('DOMContentLoaded', () => {
    fetch('resources.json')
        .then(response => response.json())
        .then(data => {
            const materials = data.learningMaterials.map(item => `<li><a href="${item.url}">${item.name}</a></li>`).join('');
            document.getElementById('learning-materials').innerHTML += `<ul>${materials}</ul>`;

            const puzzles = data.puzzles.map(item => `<li><a href="${item.url}">${item.name}</a></li>`).join('');
            document.getElementById('puzzles').innerHTML += `<ul>${puzzles}</ul>`;

            const resources = data.externalResources.map(item => `<li><a href="${item.url}" target="_blank">${item.name}</a></li>`).join('');
            document.getElementById('external-resources').innerHTML += `<ul>${resources}</ul>`;

            const articles = data.articles.map(item => `<li><a href="${item.url}" download>${item.name}</a></li>`).join('');
            document.getElementById('articles').innerHTML += `<ul>${articles}</ul>`;
        })
        .catch(error => console.error('Error loading resources:', error));
});
