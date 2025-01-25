// app/favorites/page.js
"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favs);
  }, []);

  const handleRowClick = (id) => {
    router.push(`/item/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Favorites</h1>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        {favorites.length === 0 ? (
          <p className="p-6 text-center">No favorites yet!</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Title</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((id) => (
                <tr key={id} className="hover:bg-gray-100 cursor-pointer" onClick={() => handleRowClick(id)}>
                  <td className="px-6 py-4">{id}</td>
                  <td className="px-6 py-4">{`Post ${id}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Favorites;
