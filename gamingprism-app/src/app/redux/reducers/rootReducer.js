// src/redux/reducers/rootReducer.js
import { combineReducers } from "redux";
import dataReducer from "./dataReducer"; // Adjust the path as per your folder structure

const rootReducer = combineReducers({
  data: dataReducer,
});

export default rootReducer;
