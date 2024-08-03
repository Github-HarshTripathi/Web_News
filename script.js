const API_KEY = 'e3bcb7f815514349af5d7af30fe383ea';

document.getElementById('search-button').addEventListener('click', () => {
    const searchText = document.getElementById('search-text').value;
    fetchNews(searchText);
});

const fetchNews = async (query) => {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
};

const displayNews = (articles) => {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    articles.forEach(article => {
        const newsCard = document.getElementById('template-news-card').content.cloneNode(true);
        const img = newsCard.querySelector('#news-img');
        img.src = article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/400x200';
        newsCard.querySelector('#news-title').innerText = article.title;
        newsCard.querySelector('#news-source').innerText = `${article.source.name} ${new Date(article.publishedAt).toLocaleDateString()}`;
        newsCard.querySelector('#news-desc').innerText = article.description;
        cardsContainer.appendChild(newsCard);
    });
};

const toggleTheme = () => {
    document.body.classList.toggle('theme-light');
    document.body.classList.toggle('theme-dark');
};

const onNavItemClick = (category) => {
    fetchNews(category);
};

const reload = () => {
    location.reload();
};

// Initial fetch for a default category
fetchNews('latest');
