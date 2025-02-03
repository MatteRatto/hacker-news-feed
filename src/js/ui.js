export class UI {
  constructor(newsManager) {
    this.newsManager = newsManager;
    this.newsContainer = document.getElementById("news-container");
    this.loadMoreBtn = document.getElementById("load-more");
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.loadMoreBtn.addEventListener("click", () => this.loadMoreNews());
  }

  formatDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleString();
  }

  createNewsElement(story) {
    const article = document.createElement("article");
    article.className = "news-item";

    article.innerHTML = `
      <h2 class="news-title">
        <a href="${story.url}" target="_blank" rel="noopener noreferrer">
          ${story.title}
        </a>
      </h2>
      <div class="news-meta">
        Pubblicato il ${this.formatDate(story.time)}
      </div>
    `;

    return article;
  }

  async loadMoreNews() {
    try {
      this.loadMoreBtn.disabled = true;
      const stories = await this.newsManager.loadNextBatch();

      stories.forEach((story) => {
        if (story && story.url) {
          const newsElement = this.createNewsElement(story);
          this.newsContainer.appendChild(newsElement);
        }
      });

      this.loadMoreBtn.disabled = false;
      this.loadMoreBtn.style.display = this.newsManager.hasMoreStories()
        ? "block"
        : "none";
    } catch (error) {
      console.error("Error loading more news:", error);
      this.showError("Si è verificato un errore nel caricamento delle notizie");
    }
  }

  showError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    this.newsContainer.appendChild(errorDiv);
  }
}
