const searchButton = document.getElementById('search-button');
const searchQueryInput = document.getElementById('search-query');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', () => {
    const query = searchQueryInput.value;
    resultsDiv.innerHTML = ''; // Clear previous results

    // Fetch results from DuckDuckGo API
    fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`)
        .then(response => response.json())
        .then(data => {
            // Check if there are related topics
            if (data.RelatedTopics && data.RelatedTopics.length > 0) {
                data.RelatedTopics.forEach(topic => {
                    if (topic.Text && topic.FirstURL) {
                        const resultItem = document.createElement('div');
                        const link = document.createElement('a');
                        link.href = topic.FirstURL;
                        link.target = '_blank';
                        link.textContent = topic.Text;
                        resultItem.appendChild(link);
                        resultsDiv.appendChild(resultItem);
                    }
                });
            } else {
                // Show error message if no results found
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Error: Not Found';
                resultsDiv.appendChild(errorMessage);
            }
        })
        .catch(error => {
            console.error('Error fetching results:', error);
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Error fetching results.';
            resultsDiv.appendChild(errorMessage);
        });
});
