document.addEventListener('DOMContentLoaded', () => {
    const feedDisplay = document.getElementById('feed');

    fetch('http://localhost:8000/results')
        .then(response => response.json())
        .then(data => {
            // Process the data and update the feed display
            const feedHTML = data.map(item => `
                <div>
                    <h3>${item.title}</h3>
                    <a href="${item.url}" target="_blank">Read more</a>
                </div>
            `).join('');

            feedDisplay.innerHTML = feedHTML;
        })
        .catch(err => console.log(err));
});
