import axios from "axios";
import { get } from "lodash";

const BASE_URL = process.env.API_BASE_URL;

export const fetchNewStories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/newstories.json`);

    const stories = get(response, "data", []);

    if (!stories || !Array.isArray(stories)) {
      console.error("Invalid response format:", stories);
      throw new Error("Invalid response format from API");
    }

    return stories;
  } catch (error) {
    console.error("Error fetching story IDs:", error);
    throw error;
  }
};

export const fetchStoryDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/item/${id}.json`);

    const story = get(response, "data", null);

    if (!story) {
      console.warn(`No data received for story ${id}`);
      return null;
    }

    return story;
  } catch (error) {
    console.error(`Error fetching story ${id}:`, error);
    return null;
  }
};
