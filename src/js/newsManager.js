import { fetchNewStories, fetchStoryDetails } from "./api";

export class NewsManager {
  constructor() {
    this.newsIds = [];
    this.currentIndex = 0;
    this.batchSize = 10;
  }

  async initialize() {
    try {
      this.newsIds = await fetchNewStories();
      return this.loadNextBatch();
    } catch (error) {
      throw error;
    }
  }

  async loadNextBatch() {
    const batchIds = this.newsIds.slice(
      this.currentIndex,
      this.currentIndex + this.batchSize
    );

    const stories = await Promise.all(
      batchIds.map((id) => fetchStoryDetails(id))
    );

    this.currentIndex += this.batchSize;
    return stories;
  }

  hasMoreStories() {
    return this.currentIndex < this.newsIds.length;
  }
}
