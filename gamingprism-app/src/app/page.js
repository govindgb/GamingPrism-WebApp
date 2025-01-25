"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setItems, setFavorites } from "./redux/actions/dataActions";
import { fetchPosts } from "@/utils/api";
import Table from "@/components/Table";
import { LogoutButton } from "@/components/LogoutButton";

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(false);

  const items = useSelector((state) => state.data.items);
  const favorites = useSelector((state) => state.data.favorites);

  useEffect(() => {
    setMounted(true);

    // Immediate authentication check
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.length === 0) {
          router.push('/signup');
        }
      }
    };

    const loadData = async () => {
      if (!items || items.length === 0) {
        try {
          const posts = await fetchPosts();
          dispatch(setItems(posts));
        } catch (error) {
          console.error("Error loading posts:", error);
        }
      }
    };

    checkAuth();
    loadData();
  }, [dispatch, items, router]);

  const toggleFavorite = (itemId) => {
    const newFavorites = favorites.includes(itemId)
      ? favorites.filter((id) => id !== itemId)
      : [...favorites, itemId];
    dispatch(setFavorites(newFavorites));
  };

  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 py-6 relative">
      <LogoutButton />
      <h1 className="text-3xl font-bold text-center mb-6">GamingPrism - Posts</h1>
      <Table data={items} toggleFavorite={toggleFavorite} favorites={favorites} />
    </div>
  );
};

export default Home;