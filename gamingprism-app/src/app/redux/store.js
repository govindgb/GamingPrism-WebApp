// src/redux/store.js
import { createStore } from "redux";
import rootReducer from "../redux/reducers/rootReducer"; // Adjust path as needed

// Helper functions to manage localStorage
const loadState = () => {
    try {
      const serializedState = localStorage.getItem("reduxState");
      return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (error) {
      console.error("Failed to load state from localStorage:", error);
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("reduxState", serializedState);
    } catch (error) {
      console.error("Failed to save state to localStorage:", error);
    }
  };
  
  // Load state from localStorage (if available)
  const persistedState = loadState();
  
  // Create the Redux store and integrate Redux DevTools
  const store = createStore(
    rootReducer,
    persistedState,
    typeof window !== "undefined" &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  
  // Save Redux state to localStorage on every state change
  store.subscribe(() => {
    saveState(store.getState());
  });
  
  export default store;
