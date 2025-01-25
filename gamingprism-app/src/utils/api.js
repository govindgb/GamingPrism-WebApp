import axios from "axios";
import { API_URLS } from "@/constants";

export const fetchPosts = async () => {
  try {
    const response = await axios.get(API_URLS.POSTS);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
