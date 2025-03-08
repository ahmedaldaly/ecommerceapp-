import { createContext, useContext, useEffect, useState } from "react";
import cookie from "js-cookie";
import axios from "axios";
import BaseUrl from "../Api/BaseUrl";

const FavoritContext = createContext();

export const FavoritProvider = ({ children }) => {
  const [favorite, setFavorite] = useState([]);
  const token = cookie.get("token");

  useEffect(() => {
    const fetchFavorit = async () => {
      if (!token) {
        console.error("No token found, skipping API call.");
        return;
      }
      try {
        const response = await axios.get(`${BaseUrl}/api/vi/favorites`, {
          headers: { authorization: `Bearer ${token}` },
        });
if (response == 0 ) {
  setFavorite ([])
}
        setFavorite(response.data );
      } catch (error) {
        console.error("Error fetching favorites:", error.response?.data || error.message);
      }
    };

    fetchFavorit();
  },[favorite]);

  async function deleteFavorit(id) {
    try {
      await axios.delete(`${BaseUrl}/api/vi/favorites/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      setFavorite(prevFavorites => prevFavorites.filter(fav => fav._id !== id));
      cookie.set('favorites', JSON.stringify(favorite));
    } catch (err) {
      console.log(err);
    }
  }

  async function addFavorit(id) {
    const userid = cookie.get('id');
    try {
      await axios.post(`${BaseUrl}/api/vi/favorites/add`, { user: userid, product: id }, {
        headers: { authorization: `Bearer ${token}` },
      });

      setFavorite(prevFavorites => [...prevFavorites, { _id: id }]);
      cookie.set('favorites', JSON.stringify(favorite));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <FavoritContext.Provider value={{ favorite, deleteFavorit, addFavorit }}>
      {children}
    </FavoritContext.Provider>
  );
};

export const useFavorit = () => useContext(FavoritContext);
