"use client";

import Table from "@/components//Table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems, setFavorites } from "./redux/actions/dataActions";
import { fetchPosts } from "@/utils/api";

const Home = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.data.items); // Items from Redux
  const favorites = useSelector((state) => state.data.favorites); // Favorites from Redux

  useEffect(() => {
    // Fetch posts only if items are not in Redux
    const loadData = async () => {
      // Check if items are already loaded in Redux
      if (!items || items.length === 0) {
        try {
          const posts = await fetchPosts();
          dispatch(setItems(posts)); // Store data in Redux
        } catch (error) {
          console.error("Error loading posts:", error);
        }
      }
    };

    loadData();
  }, [dispatch, items]);

  const toggleFavorite = (itemId) => {
    const newFavorites = favorites.includes(itemId)
      ? favorites.filter((id) => id !== itemId)
      : [...favorites, itemId];
    dispatch(setFavorites(newFavorites)); // Update favorites in Redux
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">GamingPrism - Posts</h1>
      <Table data={items} toggleFavorite={toggleFavorite} favorites={favorites} />
    </div>
  );
};

export default Home;
