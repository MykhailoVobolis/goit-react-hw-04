import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const API_KEY = "zhbd5bnlj4Z33BsoLbD2q24h_6OBL81KvaMbhV7hWk4";

export async function fetchImagesByWord(searchQuery) {
  const response = await axios.get(`/search/photos/?client_id=${API_KEY}`, {
    params: {
      query: `${searchQuery}`,
      per_page: "30",
      orientation: "landscape",
    },
  });
  return response.data.results;
}
