export const setItems = (items) => ({
    type: "SET_ITEMS", // Action type for setting items
    payload: items, // Payload to set the items list
  });
  export const updateItem = (id, updatedData) => ({
    type: "UPDATE_ITEM",
    payload: { id, updatedData },
  });
  export const setFavorites = (favorites) => ({
    type: "SET_FAVORITES", // Action type for setting favorite items
    payload: favorites, // Payload to set the favorites list
  });
  